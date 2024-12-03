import './Footer.css';
import { FaAppStore } from "react-icons/fa6";
import { FaGooglePlay } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";


export default function Footer() {

    return (
        <div className="container-footer w-container">
      <div className="w-row">
        <div className="footer-column w-clearfix w-col w-col-4">
          <h3 className="footer-failory-name">Biz haqimizda</h3>
          <a className="footer-description-failory">Topshirish punkti</a>
        </div>

        <div className="footer-column w-col w-col-8">
          <div className="w-row">
            <div className="w-col w-col-8">
              <div className="w-row">
                <div className="w-col w-col-7 w-col-small-6 w-col-tiny-7">
                  <h3 className="footer-titles">Foydalanvuchilarga</h3>
                  <p className="footer-links">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <span className="footer-link">Biz bilan bog`lanish<br /></span>
                    </a>
                    <a href="#">
                      <span className="footer-link">Savol-Javob<br /></span>
                    </a>
                  </p>
                </div>

                <div className="w-col w-col-5 w-col-small-6 w-col-tiny-5">
                  <h3 className="footer-titles">Tadbirkorlar</h3>
                  <p className="footer-links">
                    <a href="#">
                      <span className="footer-link">Uzumda soting<br /></span>
                    </a>
                    <a href="#">
                      <span className="footer-link">Sotuvchi kabinetiga kirish<br /></span>
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="column-center-mobile w-col w-col-4">
              <h3 className="footer-titles">Follow Us!</h3>
              <a href='#' className='icon'>
                <FaAppStore /> App Store<br/>
              </a>
              <a href='#'>
                <FaGooglePlay /> PlayMarket
              </a>

              <p className="footer-description">
                <strong className="link-email-footer">Lorem Ipsum</strong><br />
              </p>
              <a href='#'>
                <FaTelegram /> Telegram
              </a>
              <br/>
              <a href='#'>
                <FaInstagramSquare /> Instagram
              </a>
              <br/>
              <a href='#'>
                <FaFacebookSquare /> Facebook
              </a>
              <br/>
              <a href='#'>
                <FaYoutube /> YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr/>
      <p class="copyright-text">«2024© XK MCHJ «UZUM MARKET». STIR 309376127. Barcha huquqlar himoyalangan»
      </p>
    </div>

    )
}