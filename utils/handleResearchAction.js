
useEffect(() => {
    // Vérifie si les données sont déjà en cache ou s'il y a une recherche active
    if (!search && !title) {
        fetch("http://localhost:3000/submits")
            .then((response) => response.json())
            .then((data) => {
                //   console.log("submit fetch :", data);

                // Génère les titres une fois que les données sont récupérées
                const titles = data.map((e, index) => <div className={e.type} key={index}><span className="text-yellow-500">{e.title}</span><span>{e.secondaryTitle}</span></div>);
                setContent(titles);
            })
            .catch((error) => console.error(error));
    }

    if (search || title) {

        fetch(`http://localhost:3000/submits/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title,
                search: search,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                //   console.log("submit fetch :", data);

                // Génère les titres une fois que les données sont récupérées
                const titles = data.map((e, index) => 
                    <div className={e.type} key={index}>
                        <div className="flex flex-raw justify-center items-center">
                        <span className="text-yellow-500">{e.title}</span>
                        <span>{e.secondaryTitle}</span>
                        </div>
                        </div>);  // Ajouter une clé unique
                setContent(titles);
            })
            .catch((error) => console.error(error));
    }
}, [search]); // Ne se déclenche que lorsque `search` ou changent
