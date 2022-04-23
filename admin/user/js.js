function addUser(){
     username =  document.querySelector('#name').value;
     password = document.querySelector('#password').value;
     if(username == "" || password == ""){
          alert('cần điền thông tin form');
          return false
     }
     url = 'http://localhost:3000/user';
     data = {
          name: username,
          pass: password
     }

     fetch(url, {
          method: 'POST', // thêm mới thì dùng post
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data), // chuyển dữ liệu object trên thành chuỗi json
         }).then(re => {
         
           return re.json()
         })
         .then(data=> {
           console.log(data);
           alert('thêm mới thành công')
         })
     
}


function showUser(){
     url =  'http://localhost:3000/user';
     
     fetch(url, {
          method: "GET"
     })
     .then(re => {
          return re.json();
     })
     .then(data=> {
          console.log(data);
          var bang = document.querySelector("#ds-u");
          for (i = 0; i < data.length; i++) {
            var obj = data[i];
            let dong_moi = bang.insertRow(-1);
            let o1 = dong_moi.insertCell(0);
            o1.innerText = obj.id;
            let o2 = dong_moi.insertCell(1);
            o2.innerText = obj.name;
            let o3 = dong_moi.insertCell(2);
            // o3.innerText = obj.img;
             o3.innerHTML = obj.pass;

            //
            let o7 = dong_moi.insertCell(3);
            var btn_xoa = document.createElement("button");
            btn_xoa.setAttribute("type", "button");
            btn_xoa.setAttribute("class", "btn btn-warning");
            btn_xoa.innerText = "Xóa";
            btn_xoa.setAttribute("onclick", "DeleteRow(" + obj.id + ")"); // truyền vào id user
            o7.appendChild(btn_xoa);

            let o8 = dong_moi.insertCell(4);
            var btn_sua = document.createElement("button");
            btn_sua.setAttribute("type", "button");
            btn_sua.setAttribute("data-bs-toggle", "modal");
            btn_sua.setAttribute("data-bs-target", "#exampleModal");
            btn_sua.setAttribute("class", "btn btn-success");
            btn_sua.innerText = "Sua";
            btn_sua.setAttribute("onclick", "EditRow(" + obj.id + ")"); // truyền vào id user
            o8.appendChild(btn_sua);
          }
     })
}

showUser();


function DeleteRow(id){
     url = 'http://localhost:3000/user/'+ id ;
     fetch(url , {
          method: "DELETE"
     })
     .then(function (res) {
          return res.json(); // chuyển chuỗi nhận được thành đối tượng json
        })
        .then(function (data) {
          // các lệnh xử lý cho dữ liệu ở đây: các công việc hiển thị.
          // console.log(data);
          location.reload();
        });
}


function EditRow(id){
     url = 'http://localhost:3000/user/'+ id ;
     fetch(url ,{
          method : "GET"
     }).then(res => {
          return res.json();
     }).then(data=> {
          console.log(data);
          document.querySelector("input[name=name_edit]").value = data.name;
         //  document.querySelector("input[name=img]").value = data.img;
          document.querySelector("input[name=password_edit]").value = data.pass;
         
         document.querySelector("#form_edit").setAttribute("id_edit", id); // tôi gắn luôn vào thẻ form cho nhanh

         document.querySelector("#form_edit").style.display = "block";
     })
     
}


function SaveUpdate(){
          nameuser = document.querySelector("input[name=name_edit]").value;
          password = document.querySelector("input[name=password_edit]").value;
          data = {
               name: nameuser,
               pass: password
          }
          var id_edit = document.querySelector("#form_edit").getAttribute("id_edit");
          url = 'http://localhost:3000/user/'+ id_edit ;
          fetch(url, {
               method: "PATCH", // sửa thì dùng phương thức PATCH
               headers: {
                 "Content-Type": "application/json",
               },
               body: JSON.stringify(data), // chuyển dữ liệu object trên thành chuỗi json
             })
               .then((response) => response.json()) // chuyển kết quả trả về thành json object
               .then((data) => {
                 // bạn có thể làm gì đó với kết quả cuối cùng này thì làm
       
                 console.log("Success:", data); // ghi log kết quả hoàn thành
       
                 if (data.id == id_edit) {
                   // xóa rỗng các ô textbox ở form
                   document.querySelector("input[name=name_edit]").value = "";
                   document.querySelector("input[name=password_edit]").value = "";
                   document.querySelector("#form_edit").removeAttribute("id_edit"); // xóa cả cái id vừa gắn vào
                   location.reload();
                 }
               })
         

}