import TestPropertyDetailModal from "../../TestPropertyDetailModal"
import EnvGuide from "../../EnvGuide"

export default function TestPropertyDetailPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <EnvGuide />
      </div>
      <div>
        <TestPropertyDetailModal />
      </div>
    </div>
  )
}

