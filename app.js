const button = document.querySelector("#btnModal")
const Modal = document.querySelector("dialog")
const closeModal = document.querySelector("#closeModal")

button.onclick = function() {
    Modal.showModal()
}

closeModal.onclick = function(){
    Modal.close()
}


//AQUI É AONDE ACONTECE O GET 

const getPosts = async () => {
  const postagens =  document.getElementById('content')
  const apiResponse = await fetch("http://localhost:3000/Cadastro-Usuarios")
  const posts = await apiResponse.json()
  console.log(posts)
  let conteudo = ''

  posts.forEach(post => {
    conteudo += ` 
    <div class="card-box">
      <img class="imagem" src="${post.imagem}" />  
      <div class="titulo-post">
        <h1>${post.titulo}</h1>
        <p>${post.texto}</p>
      </div>
        
      <div class="btn-js">
        <button onclick="deletePost(${post.id})" id="excluir">Excluir</button>
        <button onclick="editPost(${post.id})" id="editar">Editar</button>
      </div>
    </div>`
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

//AQUI É A FUNÇÃO DE DELETAR O POST

const deletePost = async (id) => {
  await fetch(`http://localhost:3000/Cadastro-Usuarios/${id}`, {
    method: 'DELETE'
  });
  getPosts() // atualiza a lista de posts após a exclusão
}


  //AQUI É A FUNÇÃO QUE REALIZA A EDIÇÃO DO POST
  // PRECISO SOMENTE CORRIGIR SOMENTE A QUESTÃO DA EDIÇÃO QUE ESTÁ DUPLICANDO.
const editPost = async (id) => {
  const apiResponse = await fetch(`http://localhost:3000/Cadastro-Usuarios/${id}`)
  const post = await apiResponse.json()

  document.querySelector('#titulo').value = post.titulo
  document.querySelector('#autor').value = post.autor
  document.querySelector('#imagemDestaque').value = post.imagem
  document.querySelector('#caixaMaior').value = post.texto

  Modal.showModal()

  const submitBtn = document.querySelector('#submit')
  submitBtn.onclick = async () => {
    const titulo = document.querySelector('#titulo').value
    const autor = document.querySelector('#autor').value
    const imagem = document.querySelector('#imagemDestaque').value
    const texto = document.querySelector('#caixaMaior').value

    const updatedPost = {
      titulo,
      autor,
      imagem,
      texto
    }

    await fetch(`http://localhost:3000/Cadastro-Usuarios/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, /',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedPost)
    }); 


    
    closeModal.click()
    
    getPosts() // atualiza a lista de posts após a edição
    
  }
  
}



