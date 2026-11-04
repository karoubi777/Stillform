export default function Footer() {
  return (
    <footer className="bg-(--color-footer-100) max-w-[480px] mx-auto ">
      <div className="footer-container ">
        <div className="footer-first py-20  mx-auto grid w-full max-w-[362px] grid-cols-2 gap-x-6 gap-y-8 bg-(--color-footer-100)">
          <div className="flex flex-col gap-4 ">
            <p className="pr-text">Company</p>
            <div className="flex flex-col gap-2 sec-text">
              <a href="">About Us</a>
              <a href="">Our Store</a>
              <a href="">Contact Us</a>
            </div>
          </div>

          <div className="flex flex-col gap-4 ">
            <p className="pr-text">Career Opportunities</p>
            <div className="flex flex-col gap-2 sec-text">
              <a href="">Selling programs</a>
              <a href="">Advertise</a>
              <a href="">Cooperation</a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="pr-text">How to Buy</p>
            <div className="flex flex-col gap-2 sec-text">
              <a href="">Making Payments</a>
              <a href="">Delivery Options</a>
              <a href="">Buyer Protection</a>
              <a href="">New User Guide</a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="pr-text">Help</p>
            <div className="flex flex-col gap-2 sec-text">
              <a href="">Contact Us</a>
              <a href="">FAQ</a>
              <a href="">Privacy Policy</a>
            </div>
          </div>
        </div>
        <div className="flex  justify-center items-center bg-(--color-white)  gap-[30px] mx-auto w-full min-h-[80px]">
          <div>
            <img
              src="src\assets\icons\footer\Visa-logo.svg"
              alt="visa card "
              className="grayscale"
            />
          </div>
          <div>
            <img
              src="src\assets\icons\footer\Paypal-logo.svg"
              alt="visa card "
              className="grayscale"
            />
          </div>
          <div>
            <img
              src="src\assets\icons\footer\paypal2.svg"
              alt="master card logo"
              className="grayscale"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
