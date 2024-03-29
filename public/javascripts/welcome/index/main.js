$(document).ready(function()
{


	function handleDragStart(e)
	{
		this.style.opacity = '0.7';
      	e.dataTransfer.setData("Text", e.target.getAttribute('id'));
	}

	function handleDragOver(e)
	{
	    e.preventDefault();
	    return false;
	}

	function handleDragEnter(e)
	{
		this.classList.add('over');
	}

	function handleDragLeave(e)
	{
		this.classList.remove('over');
	}

	function handleDrop(e)
	{
		if(e.stopPropagation) e.stopPropagation();
		if(e.target.getAttribute('class') == "panel-body board")
		{
		    var element = document.getElementById(e.dataTransfer.getData('Text'));
	        e.target.appendChild(element);
	        var id = e.dataTransfer.getData('Text');
	        $.ajax({
			    url: '/advising_ajax/' + id,
			    type: 'PUT',
			    data: { course: id },
			    dataType: "json",
			    success: function (response) {
			    	console.log("Success");
			    },
			    error: function (response) {
			    	console.log("Failed");
			    }
			});
    	}
    	else if(e.target.getAttribute('class') == "panel-body")
    	{
    		var element = document.getElementById(e.dataTransfer.getData('Text'));
	        e.target.appendChild(element);
    	}
    	e.preventDefault();
    	e.target.classList.remove('over');
	    return true;
	}

	function handleDragEnd(e)
	{
		this.style.opacity = '1';
		var id = e.dataTransfer.getData('Text');
	}

	var items = document.getElementsByClassName('item');
	element = null;
	for (var i = 0; i < items.length; i++)
	{
		element = items[i];

		element.setAttribute('draggable', 'true');

		element.addEventListener('dragstart', handleDragStart, false);
		element.addEventListener('dragend', handleDragEnd, false);
	}

	var groups = document.getElementsByClassName('item_group');
	element = null;
	for (var i = 0; i < groups.length; i++)
	{
		element = groups[i];

		element.setAttribute('droppable', 'true');

		element.addEventListener('dragleave', handleDragLeave, false);
		element.addEventListener('dragenter', handleDragEnter, false);
		element.addEventListener('dragover', handleDragOver, false);
		element.addEventListener('drop', handleDrop, true);
	}

	var boards = document.getElementsByClassName('board');
	element = null;
	for (var i = 0; i < boards.length; i++)
	{
		element = boards[i];

		element.setAttribute('droppable', 'true');

		element.addEventListener('dragleave', handleDragLeave, false);
		element.addEventListener('dragenter', handleDragEnter, false);
		element.addEventListener('dragover', handleDragOver, false);
		element.addEventListener('drop', handleDrop, true);
	}
});