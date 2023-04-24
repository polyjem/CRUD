window.addEventListener('load', () => {
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const list_el = document.querySelector("#tasks");

  // Check for saved tasks on page load
  for (let i = 0; i < localStorage.length; i++) {
    const task_key = localStorage.key(i);
    const task_desc = localStorage.getItem(task_key);
    createTaskElement(task_key, task_desc);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const task = input.value;

    if (!task){
      alert("Please fill out the task");
      return;
    }

    const task_key = Date.now().toString(); // Generate unique key
    localStorage.setItem(task_key, task); // Save task to localStorage
    createTaskElement(task_key, task); // Create task element

    input.value = '';
  });

  function createTaskElement(key, desc) {
    const task_el = document.createElement('div');
    task_el.classList.add('task');

    const task_content_el = document.createElement('div');
    task_content_el.classList.add('content');

    task_el.appendChild(task_content_el);

    const task_input_el = document.createElement('input');
    task_input_el.classList.add('text');
    task_input_el.type = 'text';
    task_input_el.value = desc;
    task_input_el.setAttribute('readonly', 'readonly');

    task_content_el.appendChild(task_input_el);

    const task_actions_el = document.createElement('div');
    task_actions_el.classList.add('actions');

    const task_edit_el = document.createElement('button');
    task_edit_el.classList.add('edit');
    task_edit_el.innerText = 'Edit';

    const task_delete_el = document.createElement('button');
    task_delete_el.classList.add('delete');
    task_delete_el.innerText = 'Done';

    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);

    task_el.appendChild(task_actions_el);

    list_el.appendChild(task_el);

    task_edit_el.addEventListener('click', () => {
      if (task_edit_el.innerText.toLowerCase() == "edit") {
        task_edit_el.innerText = "Save";
        task_input_el.removeAttribute("readonly");
        task_input_el.focus();
      } else {
        task_edit_el.innerText = "Edit";
        task_input_el.setAttribute("readonly", "readonly");
        localStorage.setItem(key, task_input_el.value); // Update task in localStorage
      }
    });

    task_delete_el.addEventListener('click', () => {
      localStorage.removeItem(key); // Remove task from localStorage
      list_el.removeChild(task_el);
    });
  }
});
