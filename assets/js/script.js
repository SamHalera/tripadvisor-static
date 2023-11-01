window.addEventListener("DOMContentLoaded", () => {
  const connectBtn = document.querySelectorAll(".connect");
  console.log(connectBtn[0]);

  //Open Modal
  connectBtn.forEach((element) => {
    element.addEventListener("click", () => {
      console.log("Click");
      console.log("Hello");
      const divModal = document.querySelector(".modal");
      document.querySelector("body").classList.add("scroll-off");
      const closeBtn = document.querySelector(".close-modal");

      divModal.classList.remove("d-none");

      //Close modal

      closeBtn.addEventListener("click", () => {
        divModal.classList.add("d-none");
        document.querySelector("body").classList.remove("scroll-off");
      });

      //Process form values
      const form = document.querySelector("form");

      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        //SET A MESSAGE TO DISPLAY IN DOM

        const getAfeedBack = (className, string) => {
          const responseDiv = document.querySelector(".response ");
          const responsePara = document.querySelector(".response p");
          responseDiv.classList.remove("v-hidden");
          responseDiv.classList.add(className);
          responsePara.innerHTML = string;

          setTimeout(() => {
            responseDiv.classList.add("v-hidden");
            responseDiv.classList.remove(className);
            responsePara.innerHTML = "";
          }, 3000);
        };

        const data = {
          firstname: document.querySelector("#firstname").value,
          lastname: document.querySelector("#lastname").value,
          email: document.querySelector("#email").value,
          subject: document.querySelector("#subject").value,
          message: document.querySelector("#message").value,
        };

        for (const key in data) {
          if (data[key] === "") {
            return getAfeedBack("error", "tous les champs sont obligatoires!");
          }
        }
        //SEND THE FORM DATA BY ASYNC WITH AXIOS

        try {
          const response = await axios.post(
            "https://site--backend-tripadvisor--v5zlz7yt85wg.code.run/form",
            data
          );
          console.log("response=> ", response);

          getAfeedBack("success", "Le message a bien été envoyé !");

          document.querySelector("#firstname").value = "";
          document.querySelector("#lastname").value = "";
          document.querySelector("#email").value = "";
          document.querySelector("#subject").value = "";
          document.querySelector("#message").value = "";
        } catch (error) {
          console.log("error=> ", error.message);
          getAfeedBack("error", "Votre message n'a pas pu être envoyé!");
        }
      });
    });
  });
});
