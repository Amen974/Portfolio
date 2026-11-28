export const splitLetters = (el: HTMLElement | null) => {
  if (!el) return []
  const text = el.innerText
  el.innerHTML = text
    .split("")
    .map(char => `<span style="display:inline-block">${char === " " ? "&nbsp;" : char}</span>`)
    .join("")
  return el.querySelectorAll("span")
}
