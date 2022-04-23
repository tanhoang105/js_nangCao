
      // lấy tham số trên URL
      let params = new URLSearchParams(document.location.search);
      let page = params.get("page"); // lấy số trang hiện tại người dùng muốn xem
      let per_page = parseInt(params.get("per_page")); // lấy số bản ghi 1 trang, đặt mặc định là 3
    
      url = "http://localhost:3000/sanpham";
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
            o2.innerText = obj.name;
            let o3 = dong_moi.insertCell(2);
            // o3.innerText = obj.img;
             o3.innerHTML = '<img id="" src="'+ obj.img+'" alt="" height="60px" width="70px" >';
            let o4 = dong_moi.insertCell(3);
            o4.innerText = obj.price;
            let o5 = dong_moi.insertCell(4);
            o5.innerText = obj.nhan_banh;
            let o6 = dong_moi.insertCell(5);
            o6.innerText = obj.size;

            //
            let o7 = dong_moi.insertCell(6);
            var btn_xoa = document.createElement("button");
            btn_xoa.setAttribute("type", "button");
            btn_xoa.setAttribute("class", "btn btn-warning");
            btn_xoa.innerText = "Xóa";
            btn_xoa.setAttribute("onclick", "DeleteRow(" + obj.id + ")"); // truyền vào id user
            o7.appendChild(btn_xoa);

            let o8 = dong_moi.insertCell(7);
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


     // hàm xóa bản ghi
     function DeleteRow(id) {
        let url_delete = "http://localhost:3000/sanpham/" + id;
        fetch(url_delete, {
          method: "DELETE",
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
           url = "http://localhost:3000/sanpham/" + id;
           fetch(url ,{
                method : "GET"
           }).then(res => {
                return res.json();
           }).then(data=> {
                console.log(data);
                document.querySelector("input[name=name]").value = data.name;
               //  document.querySelector("input[name=img]").value = data.img;
                document.querySelector("input[name=price]").value = data.price;
                document.querySelector("input[name=nhan_banh]").value = data.nhan_banh;
                document.querySelector("input[name=size]").value = data.size;

                // phần ảnh mà edit
                img_upload = document.querySelector('#img_preview_edit').getAttribute('src');
                // phần ảnh mà khi ko edit
                img = document.querySelector("#img_preview_edit_old").setAttribute('src', data.img);

               document.querySelector("#form_edit").setAttribute("id_edit", id); // tôi gắn luôn vào thẻ form cho nhanh

               document.querySelector("#form_edit").style.display = "block";
           })
     }

     function loadAnh(){
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
      name_banh = document.querySelector('#name_banh_edit').value;
      // anh = document.querySelector('#img_preview').getAttribute('src');
      anh_upload = document.querySelector('#img_preview_edit').getAttribute('src');
      anh_upload_old = document.querySelector('#img_preview_edit_old').getAttribute('src');
      price = document.querySelector('#price_edit').value;
      nhan_banh = document.querySelector('#nhan_banh_edit').value;
      size = document.querySelector('#size_edit').value ;
      input_img = document.querySelector('#img_edit').value;
      if(input_img == ''){

        dataPost = {
          name : name_banh , 
          img : anh_upload_old,
          price : price , 
          nhan_banh : nhan_banh ,
          size : size
        }

      }else {
        dataPost = {
          name : name_banh , 
          img : anh_upload,
          price : price , 
          nhan_banh : nhan_banh ,
          size : size
        }

      }
      

      // url = 'http://localhost:3000/sanpham';

      // lấy id bản ghi cần sửa để cho vào url:
      var id_edit = document.querySelector("#form_edit").getAttribute("id_edit");

      var url_post = "http://localhost:3000/sanpham/" + id_edit; // nối vào url để cho hợp lệ.

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

            document.querySelector('#name_banh').value = "";
            document.querySelector('#img_preview').getAttribute('src') = "";
            document.querySelector('#price').value = "";
            document.querySelector('#nhan_banh').value ="";
            document.querySelector('#size').value = "";
            document.querySelector("#form_edit").removeAttribute("id_edit"); // xóa cả cái id vừa gắn vào
            location.reload();
          }
        })
        .catch((error) => {
          console.error("Error:", error); // ghi log nếu xảy ra lỗi
        });
     }


     function loadAnh(){
       const preView = document.querySelector('#img_preview_edit');
       const file = document.querySelector('#img_edit').files[0];
       const reader = new FileReader();

       reader.addEventListener('load' , function(){
         preView.src =reader.result;

       }, false);
       if(file){
         reader.readAsDataURL(file);
       }
     }

     function add(){
       name_banh = document.querySelector('#name_banh').value;
       anh = document.querySelector('#img_preview').getAttribute('src');
       price = document.querySelector('#price').value;
       nhan_banh = document.querySelector('#nhan_banh').value;
       size = document.querySelector('#size').value ;
       if(name_banh == "" || anh == "" || price== "" || nhan_banh == "" ||size==""){
         alert('vui lòng điền đầy đủ form');
         return false;
       }

       dataPost = {
         name : name_banh , 
         img : anh,
         price : price , 
         nhan_banh : nhan_banh ,
         size : size
       }
       url = 'http://localhost:3000/sanpham';
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
