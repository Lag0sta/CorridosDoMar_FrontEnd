import { clearLinks } from "../utils/submitLinksActions"
import { clearMainText } from "../utils/submitMainTextActions"
import { clear } from "../reducers/submitLinks";

export async function handleSubmitNewContent({
  userToken, 
  type, 
  title, 
  secondaryTitle, 
  selectedSubType,
  mainText, 
  linksData, 
  setIsSubmitModalOpen, 
  setError, 
  setSuccessMessage,
  setLoading, 
  dispatch,
   }) {
  
  console.log("submitLinksData",linksData)
  console.log("mainTextInSubmit :",mainText)
  console.log("titleInSubmit", title)

  setIsSubmitModalOpen(true)
    console.log("click");

    if (!title || !mainText) {
      setError("Please fill in the required fields");
      return;
    }
    setLoading(true);
    // const mainText = [];
    // mainText.push(...text.split(/[\r\n]+/))
    console.log("mainText", mainText)
    console.log("submitNewContentYES ","type :", type, "title :", title, "secondaryTitle :", secondaryTitle, "selectedSubType :", selectedSubType, "mainText :", mainText, "linksData :", linksData)
    
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

      }else if (type === "rythm") {
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
