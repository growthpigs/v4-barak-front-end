import { LanguageProvider } from "../../contexts/LanguageContext"
import BilingualAppNavigation from "../../components/BilingualAppNavigation"

export default function TestBilingualPage() {
  return (
    <LanguageProvider>
      <BilingualAppNavigation />
    </LanguageProvider>
  )
}

