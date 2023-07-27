import React from "react";
// ** Types Import
import { Settings } from 'src/@core/context/settingsContext'
import { NavLink, NavSectionTitle, VerticalNavItemsType } from 'src/@core/layouts/types'

import Box from '@mui/material/Box'

// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'

interface Props {
  settings: Settings
  navVisible?: boolean
  groupActive: string[]
  currentActiveGroup: string[]
  verticalNavItems?: VerticalNavItemsType
  saveSettings: (values: Settings) => void
  setGroupActive: (value: string[]) => void
  setCurrentActiveGroup: (item: string[]) => void
}

const resolveNavItemComponent = (item: NavLink | NavSectionTitle) => {
  if ((item as NavSectionTitle).sectionTitle) return VerticalNavSectionTitle

  return VerticalNavLink
}

const VerticalNavItems = (props: Props) => {
  // ** Props
  const { verticalNavItems } = props

  const RenderMenuItems = verticalNavItems?.map((item: NavLink | NavSectionTitle, index: number) => {
    const TagName: any = resolveNavItemComponent(item)

    return <TagName {...props} key={index} item={item} />
  })


  
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);

  React.useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 1200);
    }
    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>

{/* 
{isSmallScreen ? <Box sx={{ padding: '20px' }}>
        <ul>
          <li>
            <a href='/' target='_blank'>
             Home
            </a>
          </li>
          <li>
            <a href='https://webhosting.live/' target='_blank'>
              Free Web Hosting
            </a>
          </li>
          <li>
            <a href='https://webhostpig.com/' target='_blank'>
              Data Servers & Hosting Tools
            </a>
          </li>
          <li>
            <a href='https://news.wocsol.com/' target='_blank'>
              Wocsol News
            </a>
          </li>
          <li>
            <a href='https://igoogle.online/' target='_blank'>
              Public Archives
            </a>
          </li>
        </ul>
      </Box> : null }  */}

      
      {RenderMenuItems}
    </>
  )
}

export default VerticalNavItems
