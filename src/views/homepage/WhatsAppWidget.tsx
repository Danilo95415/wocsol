import Head from 'next/head'

function WhatsAppWidget() {
  return (
    <>
      <Head>
        <script
          async
          src="https://api.whatsapp.com/send?phone=12319991212&text=Hello%20!%20How%20can%20i%20start%20my%20project%20with%20WOCSOL.!"
        ></script>
      </Head>
      <div className="whatsapp-widget">
        <a
          href="https://api.whatsapp.com/send?phone=12319991212&text=Hello%20!%20How%20can%20i%20start%20my%20project%20with%20WOCSOL.!"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-icon-link"
        >
          <img
            src="/whatsapp-icon.svg"
            alt="WhatsApp Icon"
            width="30"
            height="30"
            className="whatsapp-icon"
          />
        </a>
      </div>
      <style jsx>{`
        .whatsapp-widget {
          position: fixed;
          bottom: 20px;
          left: 20px;
          z-index: 9999;
        }

        .whatsapp-icon-link {
          display: block;
        }

        .whatsapp-icon {
          border-radius: 50%;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease-in-out;
          padding: 5px;
        }

        .whatsapp-icon:hover {
          transform: scale(1.1);
        }

        @media (max-width: 767px) {
          .whatsapp-widget {
            bottom: 10px;
            left: 10px;
          }

          .whatsapp-icon {
            width: 5em;
            height: 5em;
          }
        }
      `}</style>
    </>
  )
}
export default WhatsAppWidget