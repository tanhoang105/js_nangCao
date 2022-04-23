function show(){
     // lấy tham số trên URL
let params = new URLSearchParams(document.location.search);
let page = params.get("page"); // lấy số trang hiện tại người dùng muốn xem
let per_page = parseInt(params.get("per_page")); // lấy số bản ghi 1 trang, đặt mặc định là 3

url = "http://localhost:3000/gioithieu";
fetch(url, {
  method: "GET",
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    var bang = document.querySelector("#ds-u");
    for (i = 0; i < data.length; i++) {
      var obj = data[i];
      let dong_moi = bang.insertRow(-1);
      let o1 = dong_moi.insertCell(0);
      o1.innerText = obj.id;
      let o2 = dong_moi.insertCell(1);
      o2.innerHTML ='<img id="" src="' + obj.anh + '" alt="" height="60px" width="70px" >';
      let o3 = dong_moi.insertCell(2);
      // o3.innerText = obj.img;
      o3.innerHTML = obj.content;

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

  .catch(function (err) {
    console.log(err);
  });
}
show();

function loadAnh() {
  const preView = document.querySelector("#img_preview");
  const file = document.querySelector("#img").files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      preView.src = reader.result;
    },
    false
  );
  if (file) {
    reader.readAsDataURL(file);
  }
}

// loadAnh();



function DeleteRow(id){
     url = 'http://localhost:3000/gioithieu/' + id;
     fetch(url , {
          method : "DELETE"
     })
     .then(re=> {
          return re.json();
     })
     .then(data=> {
          console.log(data);
          location.reload()
     })
}

function add(){
     content = document.querySelector('#content').value;
     anh = document.querySelector('#img_preview').getAttribute('src');
     dataPost = {
       content : content , 
       anh : anh
       
     }
     if(content == ''){
       alert('cần nhập thông tin ');
       return false;
     }
     url = 'http://localhost:3000/gioithieu';
     fetch(url, {
      method: 'POST', // thêm mới thì dùng post
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataPost), // chuyển dữ liệu object trên thành chuỗi json
     }).then(re => {
       return re.json()
     })
     .then(data=> {
       console.log(data);
       
     })


}



function EditRow(id){
     url = 'http://localhost:3000/gioithieu/' + id;
     fetch(url ,{
          method : "GET"
     }).then(res => {
          return res.json();
     }).then(data=> {
          console.log(data);
          content = document.querySelector("#content_edit").value = data.content;
          // phần ảnh mà edit
          img_upload = document.querySelector('#img_preview_edit').getAttribute('src');
          // phần ảnh mà khi ko edit
          img = document.querySelector("#img_preview_edit_old").setAttribute('src', data.anh);
         document.querySelector("#form_edit").setAttribute("id_edit", id); // tôi gắn luôn vào thẻ form cho nhanh
         document.querySelector("#form_edit").style.display = "block";
     })
}

function upLoadEdit(){
     const preView = document.querySelector("#img_preview_edit");
     const file = document.querySelector("#img_edit").files[0];
     const reader = new FileReader();
   
     reader.addEventListener(
       "load",
       function () {
         preView.src = reader.result;
       },
       false
     );
     if (file) {
       reader.readAsDataURL(file);
     }
}

function SaveUpdate(){
     content = document.querySelector('#content_edit').value;
     input_img = document.querySelector('#img_edit').value;
     anh_upload = document.querySelector('#img_preview_edit').getAttribute('src');
     anh_upload_old = document.querySelector('#img_preview_edit_old').getAttribute('src');
    
     if(input_img == ''){

          dataPost = {
            content : content , 
            anh: anh_upload_old
          }
     }else {
          dataPost = {
               content : content , 
               anh: anh_upload
             }
     }
    
     // lấy id bản ghi cần sửa để cho vào url:
     var id_edit = document.querySelector("#form_edit").getAttribute("id_edit");

     var url_post = "http://localhost:3000/gioithieu/" + id_edit; // nối vào url để cho hợp lệ.

     fetch(url_post, {
       method: "PATCH", // sửa thì dùng phương thức PATCH
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(dataPost), // chuyển dữ liệu object trên thành chuỗi json
     })
       .then((response) => response.json()) // chuyển kết quả trả về thành json object
       .then((data) => {
         // bạn có thể làm gì đó với kết quả cuối cùng này thì làm

         console.log("Success:", data); // ghi log kết quả hoàn thành

         if (data.id == id_edit) {
           // xóa rỗng các ô textbox ở form
           // document.querySelector("input[name=id]").value = "";
           // document.querySelector("input[name=submenu-categoty]").value = "";

           document.querySelector('#content_edit').value = "";
           document.querySelector('#img_preview_edit').getAttribute('src') = "";
           document.querySelector('#img_preview_edit_old').getAttribute('src') = "";
           
         }
       })
       .catch((error) => {
         console.error("Error:", error); // ghi log nếu xảy ra lỗi
       });
    }
