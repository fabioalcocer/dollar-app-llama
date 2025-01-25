'use client'

type Props = {
  addProduct: () => void
}

function CreateButton({ addProduct }: Props) {
  return (
    <button
      type="button"
      onClick={addProduct}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Add Product
    </button>
  )
}

export default CreateButton
