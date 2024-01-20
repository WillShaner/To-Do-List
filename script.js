
function darkMode() {
  document.body.classList.toggle('dark-mode-main')
  $('.formCon').toggleClass('dark-mode')
  $('.switch-text').toggleClass('dark-text')
}
var getAndDisplayAllTasks = async ()  => {
  await fetch('https://fewd-todolist-api.onrender.com/tasks?api_key=16')
  .then((res) => res.json())
  .then((result) => {
     $('.list-container').empty()    
      var tasks = result.tasks
      tasks = tasks.sort((a, b) => b.id - a.id);
      tasks.forEach((task) => {
        if (task.completed == true) {
          $('.list-container').append('<div class="list-container-item completed" display=true"><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '><p>' + task.content + '</p><button class="remove-btn" data-id="' + task.id + '">-</button></div');
        }
        else {
          $('.list-container').append('<div class="list-container-item active" display=true"><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '><p>' + task.content + '</p><button class="remove-btn" data-id="' + task.id + '">-</button></div>');
        }
      });
}).catch(error => 
      console.log(error)
      );
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

var rmvTask = function (id) {
  $.ajax({
    type: 'DELETE',
    url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=16',
    success: function (response, textStatus) {
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
$(document).ready(function () {

  getAndDisplayAllTasks()
  $('.activeBtn').on("click", function () {
    $('.list-container-item').removeAttr("id", "hidden")
    $('.completed').attr("id", "hidden")
  })
  $('.completeBtn').on("click", function () {
    $('.list-container-item').removeAttr("id", "hidden")
    $('.active').attr("id", "hidden")
  })
  $('.allBtn').on("click", function () {
    $('.list-container-item').removeAttr("id", "hidden")
  })


  $(document).on('click', '.remove-btn', function () {
    rmvTask($(this).data('id'))
  });

  $('#create-task').on('submit', function (e) {
    e.preventDefault();
    createTask();
  });

  $(document).on('change', '.mark-complete', function () {
    if (this.checked) {
      markTaskComplete($(this).data('id'));
    } else {
      markTaskActive($(this).data('id'));
    }
  });

})

let lat;
let long;
navigator.geolocation.getCurrentPosition(function (position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  fetchData(lat, long)
});

const fetchData = async (lat, long) => {
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=7abcb94924cccac024edc3185f2247cf`
  )
  .then((res) => res.json())
  .then((result) =>  $('.weather-container-content').html(`<h3>Weather Today</h3><img
  src='https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png'
  alt="weather icon"
/><p>${result.main.temp}&#176;F<br/>${result.name}</p>`)).catch(error => 
    console.log(error)
    );
    
};

const getQuote = async () => {
  const randomNumber = Math.floor(Math.random() * 1600);

  try {
    const response = await fetch(`https://type.fit/api/quotes`);
    const result = await response.json();

    if (result[randomNumber]) {
      const quoteContainer = document.createElement('div');
      quoteContainer.classList.add('quote-container', 'container');

      const quoteContainerContent = document.createElement('div');
      quoteContainerContent.classList.add('quote-container-content', 'container-content');

      quoteContainerContent.innerHTML = `<h3>Quote of the Day</h3><p>${result[randomNumber].text}</p> <p>-${result[randomNumber]?.author}</p>`;

      quoteContainer.appendChild(quoteContainerContent);
      document.querySelector('.stacked-containers').insertBefore(quoteContainer, document.querySelector('.weather-container'));

    } else {
      console.log('Quote not available.');
    }
  } catch (error) {
    console.error('Error fetching quote:', error);
  }
};
getQuote()
