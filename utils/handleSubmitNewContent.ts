import { clearLinks } from "./submitLinksActions"
import { clearMainText } from "./submitMainTextActions"
import { AppDispatch } from "../store/store";
import { clear } from "../store/reducers/submitLinks";
import { value } from "@material-tailwind/react/types/components/chip";

interface MainTextObj {
  text: string[];
  type: string;
}

type MainText = MainTextObj[];

interface linksDataObj {
  link: string,
  type: string,
}

type linksData = linksDataObj[];

interface Props {
  userToken: string;
  type: string;
  title: string;
  secondaryTitle: string;
  selectedSubType: string;
  mainText: MainText;
  linksData: linksData;
  setIsSubmitModalOpen: (value: boolean) => void; 
  setSuccessMessage: (value: string) => void;
  setError: (value: string) => void;
  setLoading: (value: boolean) => void;
  setCurrentMainComponent: (value: string) => void;
  dispatch: AppDispatch;
}

export async function handleSubmitNewContent({ userToken,
  type,
  title,
  secondaryTitle,
  selectedSubType,
  mainText,
  linksData,
  setIsSubmitModalOpen,
  setSuccessMessage,
  setError,
  setLoading,
  setCurrentMainComponent,
  dispatch, }: Props) {

  console.log("submitLinksData", linksData)
  console.log("mainTextInSubmit :", mainText)
  console.log("titleInSubmit", title)

  setIsSubmitModalOpen(true)
  console.log("click");

  if (!title || !mainText) {
    setError("Please fill in the required fields");
    return;
  }
  setLoading(true);
  // const mainText = [];
  // mainText.push :(...text.split(/[\r\n]+/))
  console.log("mainText", mainText)
  console.log("submitNewContentYES ", "type :", type, "title :", title, "secondaryTitle :", secondaryTitle, "selectedSubType :", selectedSubType, "mainText :", mainText, "linksData :", linksData)

  try {
    const response1 = await fetch("http://localhost:3000/users/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: userToken,
      }),
    })
    const userId = await response1.json();
    if (!userId || !userId.userId) {
      setError("Token invalide ou expiré.");
      return;
    }

    let response2;
    if (!type) {
      setError("Erreur lors de la soumission des données.");
      return;
    }
    if (type === "song") {
      console.log("Avant envoi:", linksData);

      response2 = await fetch("http://localhost:3000/submits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: type,
          title: title,
          secondaryTitle: secondaryTitle,
          secondaryType: selectedSubType,
          mainText: mainText,
          links: linksData,
          createdBy: userId.userId,
        }),
      });
      clearLinks(dispatch)
      clearMainText(dispatch)

    } else if (type === "rythm") {
      response2 = await fetch("http://localhost:3000/submits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: type,
          title: title,
          secondaryTitle: secondaryTitle,
          secondaryType: selectedSubType,
          mainText: mainText,
          links: linksData,
          createdBy: userId.userId,
        }),
      });
      clearLinks(dispatch)
      clearMainText(dispatch)

    } else if (type === "biography") {
      response2 = await fetch("http://localhost:3000/submits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: type,
          title: title,
          secondaryTitle: secondaryTitle,
          mainText: mainText,
          links: linksData,
          createdBy: userId.userId,
        }),

      });

      clearLinks(dispatch)
      clearMainText(dispatch)

    } else if (type === "lexicon") {
      console.log('LEXICON AVANT ENVOI', mainText, type, title)
      response2 = await fetch("http://localhost:3000/submits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: type,
          title: title,
          mainText: mainText,
          createdBy: userId.userId,
        }),
      });
      clearMainText(dispatch)


    }
    if (!response2) {
      setError("Une erreur s'est produite, aucune réponse du serveur.");
      return;
    }

    const data = await response2.json();
    console.log("datamsg", data)
    if (!data) {
      setError("Erreur inconnue");

    } else if (data.error) {
      setError(data.error);

    } else {
      setSuccessMessage("Submission successful");
    }

  } catch (error) {
    setError("An error occurred. Please try again.");
  } finally {
    setLoading(false);
  }


}
