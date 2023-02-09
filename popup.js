const copyBtn = document.querySelector('.copy')
const copyAllBtn = document.querySelector('.copyAll')
const copyCommit = () => {
  const text = document.querySelector('.CopyrightRichText-richText').innerText.replace(/\n/g, '')
  navigator.clipboard.writeText(text).then(
    () => {
      console.log("复制文本成功");
    },
    err => {
      console.log("clipboard write failed", err);
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      new Promise((resolve, reject) => {
        document.execCommand('copy') ? resolve(): reject('new error')
        textArea.remove()
      }).then(() => {
        alert(text + '\n复制第一条评论成功')
      }, err => {
        alert('复制失败')
      })
    }
  );


};

const copyAllCommit = () => {
  const commits = document.querySelectorAll('.CopyrightRichText-richText')
  let str = ''
  for (let i = 0; i < commits.length; i++) {
    const text = commits[i].innerText.replace(/\n/g, '')
    str += text + '\n'
  }
  navigator.clipboard.writeText(str).then(
    () => {
      console.log("复制文本成功");
    },
    err => {
      console.log("clipboard write failed", err);
      const textArea = document.createElement('textarea')
      textArea.value = str
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      new Promise((resolve, reject) => {
        document.execCommand('copy') ? resolve(): reject('new error')
        textArea.remove()
      }).then(() => {
        alert(str + '\n复制评论成功')
      }, err => {
        alert('复制失败')
      })
    }
  );



};

listenerPage = async (callback) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: callback
  });
}

copyBtn.addEventListener('click', async () => {
  listenerPage(copyCommit)
})

copyAllBtn.addEventListener('click', async () => {
  listenerPage(copyAllCommit)
})

