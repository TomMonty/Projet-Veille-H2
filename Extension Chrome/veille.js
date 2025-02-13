document.addEventListener("DOMContentLoaded", async function () {
    const titleSelect = document.getElementById("titleSelect");

    if (!titleSelect) {
        console.error("❌ Element titleSelect not found!");
        return;
    }

    try {
        // Fetch available titles from API
        const response = await fetch("http://localhost:3000/veille/titles");
        const titles = await response.json();

        console.log("📥 Titles received:", titles); // Debugging

        if (!titles.length) {
            console.warn("⚠️ No titles found in the database.");
            return;
        }

        // Add an empty default option
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "-- Sélectionner un titre (ou en ajouter un) --";
        titleSelect.appendChild(defaultOption);

        // Populate the dropdown menu
        titles.forEach(title => {
            const option = document.createElement("option");
            option.value = title;
            option.textContent = title;
            titleSelect.appendChild(option);
        });

    } catch (error) {
        console.error("❌ Error fetching titles:", error);
    }
});

document.getElementById("linkForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const link = document.getElementById("linkInput").value.trim();
    const description = document.getElementById("descriptionInput").value.trim();
    const selectedTitle = document.getElementById("titleSelect").value.trim();
    const newTitle = document.getElementById("newTitleInput").value.trim();

    // Ensure only one title is provided
    if (selectedTitle && newTitle) {
        alert("❌ Vous ne pouvez pas sélectionner un titre existant ET en ajouter un nouveau. Veuillez choisir l'un des deux.");
        return;
    }

    // Ensure a title is provided
    if (!selectedTitle && !newTitle) {
        alert("❌ Veuillez sélectionner un titre existant OU en ajouter un nouveau.");
        return;
    }

    const titleToUse = newTitle || selectedTitle;

    if (!link || !titleToUse) {
        alert("Veuillez saisir un lien et un titre.");
        console.error("❌ Submission failed: Missing data", { link, titleToUse });
        return;
    }

    const data = {
        url: link,
        description,
        titres: titleToUse
    };

    console.log("📤 Sending data:", data); // Debugging

    try {
        const response = await fetch("http://localhost:3000/veille", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("✅ Server Response:", result); // Debugging

        if (response.ok) {
            alert("Lien enregistré avec succès !");
            // Clear the input fields after submission
            document.getElementById("linkInput").value = "";
            document.getElementById("descriptionInput").value = "";
            document.getElementById("newTitleInput").value = "";
            document.getElementById("titleSelect").value = "";
        } else {
            alert("Erreur lors de l'enregistrement: " + result.message);
        }
    } catch (error) {
        console.error("❌ Erreur lors de l'envoi des données :", error);
        alert("Une erreur est survenue. Vérifiez la console.");
    }
});