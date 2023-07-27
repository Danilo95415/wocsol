import Head from 'next/head'

function WhatsAppWidget() {
  return (
    <>
      <Head>
        <script
          async
          src="https://api.whatsapp.com/send?phone=12319991212&amp;text=Hi&amp;source=&amp;data="
        ></script>
      </Head>
      <div className="whatsapp-widget">
        <a
          href="https://api.whatsapp.com/send?phone=12319991212&amp;text=Hi&amp;source=&amp;data="
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/whatsapp-icon.svg"
            alt="WhatsApp Icon"
            width="50"
            height="50"
          />
        </a>
      </div>
    </>
  )
}

export default WhatsAppWidget