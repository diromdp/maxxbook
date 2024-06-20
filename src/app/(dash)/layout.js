import dynamic from "next/dynamic";
const ReduxProvider = dynamic(() => import("../store/redux-provider"), {
  ssr: false
});


export default function SideLayout({ children }) {
  return (
    <ReduxProvider>
      <div className='flex flex-col'>
          {children}
      </div>
    </ReduxProvider>
  )
} 