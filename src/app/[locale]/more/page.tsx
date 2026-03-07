import Header from '../_components/header'

function More() {
  return (
    <div className="min-h-screen bg-linear-to-br from-brand-50 via-white to-brand-100 dark:from-[#021f15] dark:via-[#021f15] dark:to-[#0b3d2e]">
    <Header session={undefined} />
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">More</h1>
      <p className="text-gray-600 dark:text-gray-400">
        This is the More page.
      </p>
      </div>
    </div>
  )
}

export default More