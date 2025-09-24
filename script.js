const classNames = { item: 'item', text: 'text', done: 'done', del: 'del' }
const list = document.getElementById('list')
const total = document.getElementById('total')
const unchecked = document.getElementById('unchecked')
const add = document.getElementById('newTodo')
const input = document.getElementById('task')

function recalc() {
  const items = list.querySelectorAll('li')
  const n = items.length
  const u = [...items].filter(li => !li.querySelector('input[type="checkbox"]').checked).length
  total.textContent = 'Всього: ' + n
  unchecked.textContent = 'Невідмічених: ' + u
  if (n === 0) {
    if (!document.getElementById('empty')) {
      const em = document.createElement('div')
      em.id = 'empty'
      em.className = 'empty'
      em.textContent = 'Список порожній. Додайте перше завдання.'
      list.appendChild(em)
    }
  } else {
    const em = document.getElementById('empty')
    if (em) em.remove()
  }
}

function makeItem(txt) {
  const li = document.createElement('li')
  li.className = classNames.item

  const cb = document.createElement('input')
  cb.type = 'checkbox'

  const span = document.createElement('input')
  span.type = 'text'
  span.value = txt
  span.className = classNames.text

  const del = document.createElement('button')
  del.textContent = '×'
  del.className = classNames.del

  cb.addEventListener('change', () => {
    span.classList.toggle(classNames.done, cb.checked)
    recalc()
  })
  del.addEventListener('click', () => {
    li.remove()
    recalc()
  })

  li.append(cb, span, del)
  return li
}

add.addEventListener('click', () => {
  const t = input.value.trim()
  input.value = ''
  if (!t) return
  list.appendChild(makeItem(t))
  recalc()
})

document.addEventListener('DOMContentLoaded', recalc)

