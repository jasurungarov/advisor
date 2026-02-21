import { getTranslations } from 'next-intl/server'

async function Footer() {
  const t = await getTranslations();

  return (
    <footer className="py-8 bg-brand-900 text-brand-100/70">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">{t("landing.footer.copyright")}</p>
          <p className="text-xs mt-2 text-brand-100/50">
            {t("landing.footer.disclaimer")}
          </p>
        </div>
      </footer>
  )
}

export default Footer