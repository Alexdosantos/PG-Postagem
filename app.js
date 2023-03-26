// AQUI É O CÓDIGO DE ABRIR E FECHAR O MODAL
const button = document.querySelector("#btnModal")
const Modal = document.querySelector("dialog")
const closeModal = document.querySelector("#closeModal")

button.onclick = function() {
    Modal.showModal()

}

closeModal.onclick = function(){
    Modal.close()
}

// AQUI COMEÇA A INTEGRAÇÃO COM A API
const getPosts = async () => {
  const postagens =  document.getElementById('content')
  const  apiResponse = await fetch("http://localhost:3000/Cadastro-Usuarios")
  const post = await apiResponse.json()
  console.log(post)
  let conteudo = ''

  post.forEach(noticia => {
    conteudo = conteudo + `
      <div>${noticia.titulo}</div>
      <div>
        <h4>${noticia.titulo}</h4>
        <h4>Por ${noticia.autor}</h4>
        <img class="imagem" src="${noticia.imagem}" />
        <p>${noticia.texto}</p>
      </div>
    `
  })

  postagens.innerHTML = conteudo
}

window.addEventListener('DOMContentLoaded', getPosts)




//AQUI É A CRIAÇÃO DO POST 
const createPost = async (post) => {
    await fetch("http://localhost:3000/Cadastro-Usuarios", {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, /',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    });
  }

const addPost = async () => {

  const titulo = document.querySelector('#titulo').value
  const autor = document.querySelector('#autor').value
  const imagem= document.querySelector('#imagemDestaque').value
  const texto = document.querySelector('#caixaMaior').value

  const post = {
    titulo,
    autor,
    imagem,
    texto
  }

  await createPost(post)
}

document.querySelector('#submit').addEventListener('click', addPost)




//AQUI É ONDE DELETA O POST

const deletePost = async (id) => {
    await fetch(`http://localhost:3000/Cadastro-Usuarios/${id}`, {
      method: 'DELETE'
    });
  }
  
document.querySelector('#submit').addEventListener('click', deletePost)
  

// AQUI É ONDE IRÁ ACONTECER A EDIÇÃO DO POSTAGEM
const editePost = async (id, post) => {
    await fetch(`http://localhost:3000/Cadastro-Usuarios/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, /',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    });
}

