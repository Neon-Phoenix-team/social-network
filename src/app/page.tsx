import { TextArea } from '@/shared/ui/textArea/TextArea'
import { SideBar } from '@/shared/ui/sideBar/SideBar'
import "./styles/global/globals.css";

export default function Home() {
  return (
    <>
      <TextArea error={true} errorMsg={'Error text'} placeholder={'Text-area'} />
      <TextArea placeholder={'Text-area'} />
      <SideBar />
    </>
  )
}
