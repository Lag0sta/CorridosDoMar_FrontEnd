import { clearLinks } from "./handleLinksActions";
import { clearMainText } from "./handleMainTextActions";

interface MainText {
    text: string[];
    type: string;
}

interface Link {
    link: string;
    type: string;
}

interface handleEditContentProps {
    token: string;
    type: string;
    title: string;
    secondaryTitle: string;
    selectedSubType: string;
    secondaryType: string;
    mainText: MainText[];
    links: Link[];
    setIsEditOn: (value: boolean) => void;
    setError: (value: string) => void;
    setIsEditModalOpen: (value: boolean) => void;
    setLoading: (value: boolean) => void;
    dispatch: any;
    setSuccessMessage: (value: string) => void;
}

export async function handleEditContent({token, type, title, secondaryTitle, secondaryType, mainText, links, setIsEditOn, selectedSubType, setError, setIsEditModalOpen, setLoading, dispatch, setSuccessMessage}: handleEditContentProps) {
  setIsEditModalOpen(true)
  console.log("click");

  if (!title || !mainText) {
    setError("Please fill in the required fields");
    return;
  }
  setLoading(true);
 
  try {
    const response1 = await fetch("http://localhost:3000/submits/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token, // Remplacer userToken par le token approprié
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
      console.log("Avant envoi:", links);

      response2 = await fetch("http://localhost:3000/submits/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: type,
          title: title,
          secondaryTitle: secondaryTitle,
          secondaryType: selectedSubType,
          mainText: mainText,
          links: links,
        }),
      });
      //modifier les dispatch par ceux du reducer editSubmits
      clearLinks(dispatch) 
      clearMainText(dispatch)

    } else if (type === "rythm") {
      response2 = await fetch("http://localhost:3000/submits/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: type,
          title: title,
          secondaryTitle: secondaryTitle,
          secondaryType: selectedSubType,
          mainText: mainText,
          links: links,
          createdBy: userId.userId,
        }),
      });
      //modifier les dispatch par ceux du reducer editSubmits
      clearLinks(dispatch)
      clearMainText(dispatch)

    } else if (type === "biography") {
      response2 = await fetch("http://localhost:3000/submits/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: type,
          title: title,
          secondaryTitle: secondaryTitle,
          mainText: mainText,
          links: links,
          createdBy: userId.userId,
        }),

      });
      //modifier les dispatch par ceux du reducer editSubmits
      clearLinks(dispatch)
      clearMainText(dispatch)

    } else if (type === "lexicon") {
      console.log('LEXICON AVANT ENVOI', mainText, type, title)
      response2 = await fetch("http://localhost:3000/submits/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: type,
          title: title,
          mainText: mainText,
          createdBy: userId.userId,
        }),
      });
      //modifier les dispatch par ceux du reducer editSubmits
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
