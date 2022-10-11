var getAndDisplayAllTasks = function() {
    $.ajax({
        type: 'GET',
        url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=16',
        dataType: 'json',
        success: function (response, textStatus) {
            $('.list-container').empty()
          response.tasks.forEach(function(task) {
            $('.list-container').append('<div class="row"><input type="checkbox" class="mark-complete m-3 rounded-circle" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '><p class="col-xs-8">' + task.content + '</p><button class=" btn btn-danger rmvBtn" data-id="' + task.id + '">-</button>');
            });
            
            },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });
  }

  var createTask = function () {
    $.ajax({
      type: 'POST',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=16',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#new-task-content').val()
        }
      }),
      success: function (response, textStatus) {
        getAndDisplayAllTasks()
        $('#new-task-content').val(" ")
    },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    }); 
  }

  var rmvTask = function(id) {
    console.log(id)
    $.ajax({
    type: 'DELETE',
     url: 'https://fewd-todolist-api.onrender.com/tasks/'+id+'?api_key=16',
     success: function (response, textStatus) {
       console.log(response);
       getAndDisplayAllTasks() 

     },
     error: function (request, textStatus, errorMessage) {
       console.log(errorMessage);
     }
   });
  }
var markTaskComplete = function (id) {
    $.ajax({
   type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=16',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

var markTaskActive = function (id) {
    $.ajax({
   type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=16',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }
$(document).ready(function() {

      getAndDisplayAllTasks()


      $(document).on('click', '.rmvBtn', function () {
        rmvTask($(this).data('id'))
      }); 

      $('#create-task').on('submit', function (e) {
        e.preventDefault();
        createTask();
      });

      $(document).on('change', '.mark-complete', function () {
        var count = 0;
        if (this.checked) {
            markTaskComplete($(this).data('id'));
            count --
          } else {
            markTaskActive($(this).data('id'));
            count ++
        }     
        });
        $('#count').html(count)
})
