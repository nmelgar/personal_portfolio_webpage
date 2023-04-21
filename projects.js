function generate_projects() {
  var request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://raw.githubusercontent.com/nmelgar/portfolio/main/projects.json`
  );

  request.onload = function () {
    var response = request.response;
    var parsedData = JSON.parse(response);
    console.log(parsedData);

    // parent to insert the projects
    var images_container = document.getElementById("parent_of_projects");

    for (var i = 0; i < parsedData.projects.length; i++) {
      // create main container for the projects
      var col_div_element = document.createElement("div");
      col_div_element.classList.add("col");
      var parent_image = document.createElement("div");
      parent_image.classList.add("card", "shadow-sm");

      // create image element
      var image_url = parsedData.projects[i].image_url;
      var image_element = document.createElement("img");
      image_element.setAttribute("src", image_url);
      image_element.style.height = "200px";
      image_element.style.width = "320";

      // create container and text below the image
      var under_image = document.createElement("div");
      under_image.classList.add("card-body");
      var text_under_image = document.createElement("p");
      text_under_image.classList.add("card-text");
      var title = parsedData.projects[i].title;
      var short_title = title.slice(0, 40);
      if (short_title == "") {
        text_under_image.textContent = "No title available :(";
      } else {
        text_under_image.textContent = short_title;
      }
      text_under_image.style.fontSize = "16px";

      // create elements, mainly buttons below the title
      var div_under_paragraph = document.createElement("div");
      div_under_paragraph.classList.add(
        "d-flex",
        "justify-content-between",
        "align-items-center"
      );

      // container for buttons, parent of buttons
      var button_group = document.createElement("div");
      button_group.classList.add("btn-group");

      // create original code button link
      var code_a_parent = document.createElement("a");
      var original_code_button = document.createElement("button");
      original_code_button.classList.add(
        "btn",
        "btn-sm",
        "btn-outline-secondary"
      );
      original_code_button.textContent = "Code";
      original_code_button.setAttribute("type", "button");
      var code_url = parsedData.projects[i].code_url;
      if (code_url == "#") {
        code_a_parent.setAttribute("href", code_url);
        code_a_parent.setAttribute("target", "_self");
      } else {
        code_a_parent.setAttribute("href", code_url);
        code_a_parent.setAttribute("target", "_blank");
      }

      // create live project button here
      var live_a_parent = document.createElement("a");
      var live_code_button = document.createElement("button");
      live_code_button.classList.add("btn", "btn-sm", "btn-outline-secondary");
      live_code_button.textContent = "Live";
      live_code_button.setAttribute("type", "button");
      var project_live = parsedData.projects[i].project_url;
      if (project_live == "#") {
        live_a_parent.setAttribute("href", "#");
        live_a_parent.setAttribute("target", "_self");
      } else {
        live_a_parent.setAttribute("href", project_live);
        live_a_parent.setAttribute("target", "_blank");
      }

      var smallElement = document.createElement("small");
      smallElement.classList.add("text-body-secondary");
      var category = parsedData.projects[i].category;
      smallElement.textContent = category;

      images_container.appendChild(col_div_element);
      col_div_element.appendChild(parent_image);
      parent_image.appendChild(image_element);
      parent_image.appendChild(under_image);
      under_image.append(text_under_image);
      under_image.appendChild(div_under_paragraph);
      div_under_paragraph.appendChild(button_group);
      button_group.appendChild(code_a_parent);
      code_a_parent.appendChild(original_code_button);
      button_group.appendChild(live_a_parent);
      live_a_parent.appendChild(live_code_button);
      div_under_paragraph.appendChild(smallElement);
    }
  };

  request.send();
}

generate_projects();
