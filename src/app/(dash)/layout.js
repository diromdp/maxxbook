
export default function SideLayout({ children }) {
  return (
    <div className='flex flex-col h-screen justify-between'>
      <div className='flex-grow'>
        {children}
      </div>
    </div>
  )
} 