import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

//#1-7 0209
//Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);

// Get Posts
function getPosts() {
	http
		.get('http://localhost:3000/posts')
		.then(data => ui.showPosts(data))
		.catch(err => console.log(err));
}

// Submit Post
function submitPost() {
	const title = document.querySelector('#title').value;
	const body = document.querySelector('#body').value;
	//#1-10 0209
	const id = document.querySelector('#id').value;

	const data = {
		title,
		body
	};

	//#1-6 0209
	//Validate input
	if (title === '' || body === '') {
		ui.showAlert('Please fill in all fields', 'alert alert-danger');
	} else {
		//#1-9 0209
		//check for ID
		if (id === '') {
			//Create post
			// Create Post
			http
				.post('http://localhost:3000/posts', data)
				.then(data => {
					ui.showAlert('Post added', 'alert alert-success');
					ui.clearFields();
					getPosts();
				})
				.catch(err => console.log(err));
		} else {
			//Update Post
			http
				.put(`http://localhost:3000/posts/${id}`, data)
				.then(data => {
					ui.showAlert('Post updated', 'alert alert-success');
					ui.changeFormState('add');
					getPosts();
				})
				.catch(err => console.log(err));
		}
	}
}

// Delete Post
function deletePost(e) {
	e.preventDefault();
	if (e.target.parentElement.classList.contains('delete')) {
		const id = e.target.parentElement.dataset.id;
		if (confirm('Are you sure?')) {
			http
				.delete(`http://localhost:3000/posts/${id}`)
				.then(data => {
					ui.showAlert('Post Removed', 'alert alert-success');
					getPosts();
				})
				.catch(err => console.log(err));
		}
	}
}

//#1-2
// Enable Edit State
function enableEdit(e) {
	//#1-3 - try and see what you get
	//output: <i></i> level. We want to get to its parent level of <i> which is link.
	// console.log(e.target);

	//This e.target.parentElement will look for the parent element of <i> which is .edit.
	if (e.target.parentElement.classList.contains('edit')) {
		//let's see to get id from the dataset - you will see it after you click on pencil icon and go to Console.
		// console.log(e.target.parentElement.dataset.id);
		const id = e.target.parentElement.dataset.id;

		//Get title and body
		//This one will get your body text content.
		// console.log(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

		const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

		const body = e.target.parentElement.previousElementSibling.textContent;

		const data = {
			id,
			title,
			body
		};

		// // Fill form with current post
		ui.fillForm(data);
	}

	//you want to prevent the default setting of loading.
	e.preventDefault();
}

//#1-8 0209
//Cancel Edit state
function cancelEdit(e) {
	if (e.target.classList.contains('post-cancel')) {
		ui.changeFormState('add');
	}
}
