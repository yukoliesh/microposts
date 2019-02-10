class UI {
	constructor() {
		this.post = document.querySelector('#posts');
		this.titleInput = document.querySelector('#title');
		this.bodyInput = document.querySelector('#body');
		this.idInput = document.querySelector('#id');
		this.postSubmit = document.querySelector('.post-submit');
		this.forState = 'add';
	}

	//Show all posts
	showPosts(posts) {
		let output = '';

		posts.forEach(post => {
			output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>

            <a href="#" class="delete card-link" data-id="${post.id}">
            <i class="fa fa-remove"></i>
          </a>
          </div>
        </div>
      `;
		});

		this.post.innerHTML = output;
	}

	//Show alert message
	showAlert(message, className) {
		this.clearAlert();

		// Create div
		const div = document.createElement('div');
		// Add classes
		div.className = className;
		// Add text
		div.appendChild(document.createTextNode(message));
		// Get parent
		const container = document.querySelector('.postsContainer');
		// Get posts
		const posts = document.querySelector('#posts');
		// Insert alert div
		container.insertBefore(div, posts);

		// Timeout
		setTimeout(() => {
			this.clearAlert();
		}, 3000);
	}

	//Clear alert message
	clearAlert() {
		const currentAlert = document.querySelector('.alert');

		if (currentAlert) {
			currentAlert.remove();
		}
	}

	//Clear all fields
	clearFields() {
		this.titleInput.value = '';
		this.bodyInput.value = '';
	}

	//#1-3
	// Fill form to edit
	fillForm(data) {
		this.titleInput.value = data.title;
		this.bodyInput.value = data.body;
		this.idInput.value = data.id;

		//#1-1
		this.changeFormState('edit');
	}

	//#1-5
	//Clear ID hidden value
	clearIdInput() {
		this.idInput.value = '';
	}

	//#1-2
	//Change the form state
	changeFormState(type) {
		if (type === 'edit') {
			this.postSubmit.textContent = 'Update Post';
			this.postSubmit.className = 'post-submit btn btn-warning btn-block';

			//#1-3
			//Create cancel button - to get out of the state
			const button = document.createElement('button');
			button.className = 'post-cancel btn btn-light btn-block';
			button.appendChild(document.createTextNode('Cancel Edit'));

			//Get parent
			const cardForm = document.querySelector('.card-form');
			//Get element to insert before
			const formEnd = document.querySelector('.form-end');
			//Insert cancel button
			//This cancel btn will be displayed on UI but doesn't do anything yet.
			cardForm.insertBefore(button, formEnd);
		} else {
			//#1-4
			//We want to change back the state to ADD.
			//If anything other than Edit it is going to be ADD
			//Change the color the button back. Post submit back to what it was.
			this.postSubmit.textContent = 'Post It';
			this.postSubmit.className = 'post-submit btn btn-warning btn-block';

			//Remove cancen btn if its is there
			if (document.querySelector('.post-cancel')) {
				document.querySelector('post-cancel').remove();
			}
			//Clear ID from hidden field
			this.clearIdInput();
			//Clear text
			this.clearFields();
		}
	}
}

export const ui = new UI();
