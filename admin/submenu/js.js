
    
    // lấy tham số trên URL
    let params = new URLSearchParams(document.location.search);
    let page = params.get("page"); // lấy số trang hiện tại người dùng muốn xem
    let per_page = parseInt(params.get("per_page")); // lấy số bản ghi 1 trang, đặt mặc định là 3
    console.log(
      "http://localhost:3000/submenu-category?page=" +
        page +
        "&per_page=" +
        per_page
    );
    // option = {
    //   url:
    //     "http://localhost:3000/submenu-category?page=" +
    //     page +
    //     "&per_page=" +
    //     per_page,
    //   method: "get",
    //   responseType: "json",
    // };
      url = 'http://localhost:3000/submenu-category';
    fetch(url , {
      method : "GET"
    })
    .then(res=> {
      return res.json();
    })
      .then(function (data_res) {
        console.log(data_res);
        // list = data_res.data;
        // console.log(list);
        var bang = document.querySelector("#ds-u");
        for (i = 0; i < data_res.length; i++) {
          var obj = data_res[i];
          // Tạo thêm 1 dòng ở cuối bảng bằng cú pháp sau
          let dong_moi = bang.insertRow(-1);

          // Thêm ô thứ nhất, chỉ số thứ tự là 0, ô này dùng để hiển thị ID
          let o1 = dong_moi.insertCell(0);
          o1.innerText = obj.id;

          // Thêm ô thứ hai, chỉ số thứ tự là 1, ô này dùng để hiển thị username
          let o2 = dong_moi.insertCell(1);
          o2.innerText = obj.name;

          let o3 = dong_moi.insertCell(2);
          // tạo nút bấm xóa:
          var btn_xoa = document.createElement("button");
          btn_xoa.setAttribute("type", "button");
          btn_xoa.setAttribute("class", "btn btn-warning");
          btn_xoa.innerText = "Xóa";
          btn_xoa.setAttribute("onclick", "DeleteRow(" + obj.id + ")"); // truyền vào id user
          o3.appendChild(btn_xoa);

          let o4 = dong_moi.insertCell(3);
          var btn_sua = document.createElement("button");
          btn_sua.setAttribute("type", "button");
          btn_sua.setAttribute("data-bs-toggle", "modal");
          btn_sua.setAttribute("data-bs-target", "#exampleModal");
          btn_sua.setAttribute("class", "btn btn-success");
          btn_sua.innerText = "Sua";
          btn_sua.setAttribute("onclick", "EditRow(" + obj.id + ")"); // truyền vào id user
          o4.appendChild(btn_sua);
        }

        // ========================================================================

        // -- xử lý số trang
        // li_page = "";
        // for (i = 1; i <= data_res.data.total_pages; i++) {
        //   li_page +=
        //     "<li><a href='?page=" + i + "&per_page=3' >" + i + "</a></li>";
        // }
        // document.querySelector("#page-number").innerHTML = li_page;
      })
      .catch(function (err) {
        console.log(err);
      });

    function DeleteRow(id) {
      let url_delete = "http://localhost:3000/submenu-category/" + id;
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

    function EditRow(id) {
      //
      console.log("Edit row " + id);
      // hàm này có chức năng lấy thông tin bản ghi và hiện lên form.
      // vì nhiều khi danh sách không hiển thị hết thông tin của bản ghi nên phải load lại từ server.

      let url_delete = "http://localhost:3000/submenu-category/" + id;

      fetch(url_delete, {
        method: "GET", // dùng phương thức get để lấy thông tin
      })
        .then(function (res) {
          return res.json(); // chuyển chuỗi nhận được thành đối tượng json
        })
        .then(function (data) {
          // các lệnh xử lý cho dữ liệu ở đây: các công việc hiển thị.
          console.log(data);
          // tham số data lúc này sẽ là một đối tượng, ta sẽ sử dụng theo cách dùng của đối tượng: Tên.THuộc tính

          // thực hiện gắn dữ liệu lên form
          // <input type="text" name="username" placeholder="Nhập username" /> <br>
          // <input type="text" name="fullname" placeholder="Nhập họ tên" /> <br>
          // <input type="text" name="email" placeholder="Nhập email" />

        //   document.querySelector("input[name=id]").value = data.id;
          document.querySelector("input[name=submenu-categoty]").value = data.name;

          //ngoài ra bạn cần giữ lại id để làm căn cứ gửi dữ liệu lên, có thể là thêm 1 thẻ hidden hoặc gắn luôn vào 1 thuộc tính của thẻ form
          document.querySelector("#form_edit").setAttribute("id_edit", id); // tôi gắn luôn vào thẻ form cho nhanh

          document.querySelector("#form_edit").style.display = "block";
          // ok giờ đợi người dùng sửa và bấm nút cập nhật.
        });
    }

    function SaveUpdate() {
      //1. Lấy dữ liệu
   //    var id = document.querySelector("input[name=id]").value;
      var submenu = document.querySelector("input[name=submenu-categoty]").value;
      var dataPost = {
        // id: id,
        name: submenu,
      };

      // lấy id bản ghi cần sửa để cho vào url:
      var id_edit = document.querySelector("#form_edit").getAttribute("id_edit");

      var url_post = "http://localhost:3000/submenu-category/" + id_edit; // nối vào url để cho hợp lệ.

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
            document.querySelector("input[name=id]").value = "";
            document.querySelector("input[name=submenu-categoty]").value = "";
            document.querySelector("#form_edit").removeAttribute("id_edit"); // xóa cả cái id vừa gắn vào
            location.reload();
          }
        })
        .catch((error) => {
          console.error("Error:", error); // ghi log nếu xảy ra lỗi
        });
    }


    function SaveNew(){
      //lấy dữ liệu từ form 
      // var i = document.querySelector("input[name=id]").value;
      var sub = document.querySelector("input[name=submenu-categoty]").value;
      if(sub == ""){
        alert('cần điền đầy đủ form');
        return false;
      }

 
     
          url =  'http://localhost:3000/submenu-category', // link file mà muốn thêm
         
          data = {
              name : sub
             
          }
      
      // gọi hàm axios để thực thi
      fetch(url, {
        method: 'POST', // thêm mới thì dùng post
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // chuyển dữ liệu object trên thành chuỗi json
       }).then(function(res){
          console.log(res);
          if(res.status == 201)
              alert("Thêm mới thành công")
      })
      .catch(function (ex){
          console.log(ex);
      }); 

      return false;
  }
