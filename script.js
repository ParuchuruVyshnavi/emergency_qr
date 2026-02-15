document.addEventListener("DOMContentLoaded", function () {

const toggleBtn = document.getElementById("toggleThemeBtn");

if(toggleBtn){
toggleBtn.addEventListener("click", function(){
document.body.classList.toggle("dark");
});
}
    const generateBtn = document.getElementById("generateBtn");
    const phoneInput = document.getElementById("phone");
    const bloodInput = document.getElementById("blood");
    const hospitalBtn = document.getElementById("hospitalBtn");
    const medicalSelect = document.getElementById("medical");
const otherMedicalInput = document.getElementById("otherMedical");

if (medicalSelect && otherMedicalInput) {

    medicalSelect.addEventListener("change", function () {

        let selected = Array.from(medicalSelect.selectedOptions)
            .map(option => option.value);

        if (selected.includes("Other")) {
            otherMedicalInput.style.display = "block";
        } else {
            otherMedicalInput.style.display = "none";
            otherMedicalInput.value = "";
        }

    });

}

   
    if (phoneInput) {
        phoneInput.addEventListener("input", function () {
            this.value = this.value.replace(/\D/g, "").substring(0, 10);
        });
    }

   
    if (generateBtn) {

        generateBtn.addEventListener("click", function () {

            let name = document.getElementById("name").value.trim();
            let blood = bloodInput.value.trim().toUpperCase();
            let phone = phoneInput.value.trim();
            let address = document.getElementById("address").value.trim();

           
            if (!name) {
                alert("Enter Name");
                return;
            }

            if (!/^(A|B|AB|O)[+-]$/.test(blood)) {
                alert("Invalid Blood Group (Ex: A+, O-)");
                return;
            }

            if (!/^[6-9]\d{9}$/.test(phone)) {
                alert("Invalid Phone Number");
                return;
            }

         
            let baseURL = "https://paruchuruvyshnavi.github.io/emergency_qr/view.html";

            let qrURL = baseURL +
                `?name=${encodeURIComponent(name)}` +
                `&blood=${encodeURIComponent(blood)}` +
                `&phone=${encodeURIComponent(phone)}` +
                `&address=${encodeURIComponent(address)}`;

            let qrcodeDiv = document.getElementById("qrcode");
            qrcodeDiv.innerHTML = "";

            new QRCode(qrcodeDiv, {
                text: qrURL,
                width: 220,
                height: 220
            });

          
            let downloadBtn = document.getElementById("downloadQR");
            if (downloadBtn) {
                downloadBtn.style.display = "block";

                downloadBtn.onclick = function () {
                    let img = document.querySelector("#qrcode img");
                    if (img) {
                        let link = document.createElement("a");
                        link.href = img.src;
                        link.download = "Emergency_QR.png";
                        link.click();
                    }
                };
            }


            let printBtn = document.getElementById("printQR");
            if (printBtn) {
                printBtn.style.display = "block";

                printBtn.onclick = function () {
                    let img = document.querySelector("#qrcode img");
                    if (img) {
                        let w = window.open("", "", "width=400,height=400");

                        w.document.write(`
                        <h3>🚨 Emergency QR</h3>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Blood:</strong> ${blood}</p>
                        <img src="${img.src}" width="200">
                        <p style="color:red;font-size:12px;">
                        ⚠ Please print and carry this QR card for emergency use.
                        </p>
                        `);

                        w.document.close();
                        w.print();
                    }
                };
            }

        });
    }

   
    if (hospitalBtn) {

        hospitalBtn.addEventListener("click", function () {

            if (navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(function (pos) {

                    let lat = pos.coords.latitude;
                    let lon = pos.coords.longitude;

                    let url =
                        "https://www.google.com/maps/search/hospitals/@" +
                        lat + "," + lon + ",15z";

                    window.open(url, "_blank");

                });

            } else {
                alert("Geolocation not supported");
            }

        });

    }

});
