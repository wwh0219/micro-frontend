/**
 * 加载js文件
 * @param scripts js资源路径数组
 */
export const loadScripts = async (scripts: string[] = []) => {
  for (let i = 0; i < scripts.length; i++) {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = scripts[i]
      script.type = 'text/javascript'
      document.body.appendChild(script)
      script.onload = () => {
        resolve()
      }
    })
  }
}
/**
 * 加载css文件
 * @param links css文件资源路径数组
 */
export const loadStyles = async (links:string[] = []) => {
  const head = document.querySelector('head')
  const pending = links.map((s, i) => {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = s
      head!.appendChild(link)
      link.onload = () => {
        resolve()
      }
    })
  })
  return Promise.all(pending)
}
