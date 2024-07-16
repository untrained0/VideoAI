import Extension from "@/components/extension"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor, PlasmoGetShadowHostId } from "plasmo"
import cssText from "data-text:~style.css"
import Provider from "@/components/provider"

const INJECT_ELEMENT_ID = "#secondary-inner.style-scope.ytd-watch-grid"

export const config: PlasmoCSConfig = {
  matches: ["https://www.youtube.com/*"]
}

export const getStyle = () => {
  const baseFontSize = 12
  let updatedCssText = cssText.replaceAll("root", ":host(plasmo-csui)")
  const remRegex = /([\d.]+)rem/g
  updatedCssText = updatedCssText.replace(remRegex, (match, remValue) => {
    const pixels = parseFloat(remValue) * baseFontSize
    return `${pixels}px`
  })

  const style = document.createElement("style")
  style.textContent = updatedCssText
  return style
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
  element: document.querySelector(INJECT_ELEMENT_ID),
  insertPosition: "afterbegin"
})

export const getShadowHostId: PlasmoGetShadowHostId = () => `plasmo inline`

function PlasmoMaiinUI() {

  return (
    <Provider>
      <Extension />
    </Provider>
  )
}

export default PlasmoMaiinUI;