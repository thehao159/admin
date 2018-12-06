function setLocalStorage(a) { //tạo localstorage cho danh sách sản phẩm
    window.localStorage.setItem("ListProductLocalStorage", JSON.stringify(a));
}

function getLocalStorage() { //lấy localstorage
    return JSON.parse(window.localStorage.getItem("ListProductLocalStorage"));
}

window.onload = function checklocalstorage() //kiểm tra localstorage
    {
        if (getLocalStorage() == null) {
            setLocalStorage(list_products);
        }
    }

function openProducts() //khi ấn vào sản phẩm mặc định là hiện hết sản phẩm
{
    document.getElementById("products").style.display = "block";
    var t = getLocalStorage();
    // giá của sản phẩm đã được giảm giá thì sao
    var s = `<tr>
				<th>STT</th>
				<th>Mã sản phẩm</th>
				<th>Ảnh</th>
				<th>Tên sản phẩm</th>
				<th>Giá tiền</th>
				<th>Xóa</th>
				<th>Sửa</th>
			 </tr>	`;
    for (var i = 0; i < t.length; i++) {
        var ti = t[i];
        var temp = ti.name.replace(/ /g, "-");
        s += `<tr>
				<td>` + (i + 1) + `</td>
				<td>` + ti.masp + `</td>
				<td><img src="` + ti.img + `"></td>
				<td>
					<a target="blank" href="https://hoangtran0410.github.io/DoAn_Web1/chitietsanpham.html?` +
            temp + `">` + ti.name + `<a>
				</td>
				<td>` + ti.price + `</td>
				<td onclick="deleteSp('` + ti.masp + `')"><i class="fa fa-close"></i></td>
				<td onclick="change('` + ti.masp + `')"><i class="fa fa-wrench"></i></td>
			 </tr>`;
    }
    document.getElementById("the_lists").innerHTML = s;
    document.getElementById("area_change").style.display = "none";
    document.getElementById("area_add").style.display = "none";
}

// function searchproducts(list,ten)//tìm theo tên
// {
// 	var t = list;
// 	var findedproducts = [];
// 	for (var i of t)
// 	{
// 		if (i.name.toUpperCase().indexOf(ten.toUpperCase()) != -1)
// 		{
// 			findedproducts.push(i);
// 		}
// 	}
// 	return findedproducts;
// }
// ctrl + alt + f => lam dep code js

function hideEle(ele, hide) {	
    
        if (hide) {
            ele.style.display = "none";
        } else {
            ele.style.display = "";
        }
}

function checkProducts_Name() //tìm kiếm tương đối theo tên và đưa kết quả vào table
{
    var id = document.getElementById("search_id");
    var laytr = document.getElementsByTagName("tr");
    var input = document.getElementById("search_name").value;
    if (input != "") id.disabled = true;
    if (input == "") id.disabled = false;
    for (var i = 1; i < laytr.length; i++) {
        var td = laytr[i].getElementsByTagName("td")[3];
        var tenSp = td.getElementsByTagName("a")[0].innerHTML;

        if (tenSp.toUpperCase().indexOf(input.toUpperCase()) == -1) {
            hideEle(laytr[i], true);
        } else {
            hideEle(laytr[i], false);
        }
    }
}

function checkProducts_Id() //tìm kiếm tương đối theo mã và đưa kết quả vào table
{
    var id = document.getElementById("search_id").value;
    var laytr = document.getElementsByTagName("tr");
    var input = document.getElementById("search_name");
    if (id != "") {
        input.disabled = true;
        for (var i = 1; i < laytr.length; i++) {
            var td = laytr[i].getElementsByTagName("td")[1];
            var maSp = td.innerHTML;
            if (maSp.indexOf(id) == -1) {
                hideEle(laytr[i], true);
            } else {
                hideEle(laytr[i], false);
            }
        }
    }
    if (id == "") {
        input.disabled = false;
        for (var i = 1; i < laytr.length; i++) {
            hideEle(laytr[i], false);
        }
    }
}

function closeProducts() //nút tắt sản phẩm
{
    document.getElementById("products").style.display = "none";
}


//Phần thêm xóa sửa

function backInAdd() //nút back ở trong area_add
{
    document.getElementById("area_add").style.display = "none";
    document.getElementById("products").style.display = "block";
}

function timMaLonNhat() {
    var t = getLocalStorage();
    var max = 0;
    for (var i of t) {
        if (i.masp > max) max = i.masp;
    }
    return max;
}

function openAdd() {
    document.getElementById("area_add").style.display = "block";
    document.getElementById("products").style.display = "none";
    var masp = parseInt(timMaLonNhat()) + 1;
    var s =
        `<b>Sản Phẩm cần thêm</b>
	<div>Mã sản phẩm : <input disabled="disabled" id="addmasp" value="` + masp + `"></div>
	<div>Tên sản phẩm : <input id="addname" value=""></div>
		<div>Hãng : 
			<select id="addhang">`;
    var hang = ["Apple", "Samsung", "Oppo", "Nokia", "Huawei", "Xiaomi", "Realme", "Vivo", "Philips", "Mobell", "Mobiistar", "Itel", "Coolpad", "HTC", "Motorola"];
    for (var i = 0; i < hang.length; i++) {
        s += `<option value="` + hang[i] + `">` + hang[i] + `</option>`;
    }
    s += `</select>
		</div>
		<div>Hình đại diện :<img id="addimg" src=""><input id="upload2" type="file" accept="image/*" onchange="loadFile(event, 'addimg')">
	</div>
		<div>Giá tiền : <input id="addprice" value=""></div>
		<div>Số sao : <input id="addstar" value=""></div>
		<div>Đánh giá : <input id="addrateCount" value=""></div>
		<div>Khuyến mãi :
			<div>Tên Khuyến mãi : 
			<select id="addpromo_name">
				<option value="">Không</option>
				<option value="giamgia">Giảm giá</option>
				<option value="tragop">Trả góp</option>
				<option value="giareonline">Giá rẻ Online</option>
				<option value="moiramat">Mới ra mắt</option>
			</select>
			<div>Giá trị khuyến mãi : <input id="addpromo_value" value=""></div>
		</div>
		<div><b>Thông số kỹ thuật</b></div>
		<div>Màn hình : <input id="adddetail_screen" value=""></div>
		<div>Hệ điều hành : <input id="adddetail_os" value=""></div>
		<div>Camara sau : <input id="adddetail_camara" value=""></div>
		<div>Camara trước : <input id="adddetail_camaraFront" value=""></div>
		<div>CPU : <input id="adddetail_cpu" value=""></div>
		<div>RAM : <input id="adddetail_ram" value=""></div>
		<div>Bộ nhớ trong : <input id="adddetail_rom" value=""></div>
		<div>Thẻ nhớ : <input id="adddetail_microUSB" value=""></div>
		<div>Đánh Dung lượng pin : <input id="adddetail_battery" value=""></div>
		<button onclick="them()">Thêm</button>`
    document.getElementById("add_product").innerHTML = s;
}

function them() {
    var masp = document.getElementById("addmasp");
    var ten = document.getElementById("addname");
    var hang = document.getElementById("addhang");
    var img = document.getElementById("addimg");
    var price = document.getElementById("addprice");
    var star = document.getElementById("addstar");
    var rateCount = document.getElementById("addrateCount");
    var promo_name = document.getElementById("addpromo_name");
    var promo_value = document.getElementById("addpromo_value");
    var detail_screen = document.getElementById("adddetail_screen");
    var detail_os = document.getElementById("adddetail_os");
    var detail_camara = document.getElementById("adddetail_camara");
    var detail_camaraFront = document.getElementById("adddetail_camaraFront");
    var detail_cpu = document.getElementById("adddetail_cpu");
    var detail_ram = document.getElementById("adddetail_ram");
    var detail_rom = document.getElementById("adddetail_rom");
    var detail_microUSB = document.getElementById("adddetail_microUSB");
    var detail_battery = document.getElementById("adddetail_battery");
    var kiemtrathem = confirm("Bạn có chắc chắn muốn thêm ?");
    if (kiemtrathem == true) {
        console.log(img.src);
        if (check(ten, img, price) != false) {
            var stringprice = numToString(price.value);
            var addproduct = {
                "name": ten.value,
                "company": hang.value,
                "img": img.src,
                "price": stringprice,
                "star": star.value,
                "rateCount": rateCount.value,
                "promo": {
                    "name": promo_name.value,
                    "value": promo_value.value
                },
                "detail": {
                    "screen": detail_screen.value,
                    "os": detail_os.value,
                    "camara": detail_camara.value,
                    "camaraFront": detail_camaraFront.value,
                    "cpu": detail_cpu.value,
                    "ram": detail_ram.value,
                    "rom": detail_rom.value,
                    "microUSB": detail_microUSB.value,
                    "battery": detail_battery.value
                },
                "masp": masp.value
            };
            var t = getLocalStorage();
            t.push(addproduct);
            setLocalStorage(t);
            alert("Thêm thành công!");
            openProducts();
        }
    }
}

function deleteSp(masp) {
    if (confirm("Bạn có chắc chắn muốn xóa ?")) {
        var t = getLocalStorage();
        var deleted = [];
        for (var i of t) {
            if (masp != i.masp) {
                deleted.push(i);
            }
        }
        setLocalStorage(deleted);
        alert("Xóa thành công!");
        openProducts();
    }
}

function timTheoMa(masp) //trả về sp theo masp
{
    var list = getLocalStorage();
    for (var i of list) {
        if (i.masp == masp) {
            return i;
        }
    }
}

function backInChange() //nút back ở trong area_change
{
    document.getElementById("area_change").style.display = "none";
    document.getElementById("products").style.display = "block";
}

function check(ten, img, gia) {
    if (ten.value == "") {
        alert("Bạn chưa nhập tên");
        ten.focus();
        return false;
    }
    if (img.src == "") {
        alert("Bạn chưa có hình");
        img.focus();
        return false;
    }
    if (gia.value == "" || Number(gia.value) < 0 || isNaN(gia.value) == true) {
        alert("Giá không hợp lệ");
        gia.focus();
        return false;
    }
    return true;
}

function change(masp) {
    document.getElementById("products").style.display = "none";
    document.getElementById("area_change").style.display = "block";
    var s3 = ["", "giamgia", "tragop", "giareonline", "moiramat"];
    var t = timTheoMa(masp);
    var s1 = "<b>Thông tin sản phẩm cần sửa</b>"
    s1 += `<div>Mã sản phẩm : ` + t.masp + `</div>
		<div>Tên sản phẩm : ` + t.name + `</div>
		<div>Hãng : ` + t.company + `</div>
		<div>Hình đại diện : <img src="` + t.img + `"></div>
		<div>Giá tiền : ` + t.price + `</div>
		<div>Số sao : ` + t.star + `</div>
		<div>Đánh giá : ` + t.rateCount + `</div>
		<div>Khuyến mãi : 
			<div>Tên Khuyến mãi : `
    if (t.promo.name == s3[0]) s1 += ``;
    if (t.promo.name == s3[1]) s1 += `Giảm giá`;
    if (t.promo.name == s3[2]) s1 += `Trả góp`;
    if (t.promo.name == s3[3]) s1 += `Giá rẻ Online`;
    if (t.promo.name == s3[4]) s1 += `Mới ra mắt`;
    s1 += `</div>
			<div>Thông tin khuyến mãi : ` + t.promo.value + `</div>
		</div>
		<div><b>Thông số kỹ thuật</b></div>
		<div>Màn hình : ` + t.detail.screen + `</div>
		<div>Hệ điều hành : ` + t.detail.os + `</div>
		<div>Camara sau : ` + t.detail.camara + `</div>
		<div>Camara trước : ` + t.detail.camaraFront + `</div>
		<div>CPU : ` + t.detail.cpu + `</div>
		<div>RAM : ` + t.detail.ram + `</div>
		<div>Bộ nhớ trong : ` + t.detail.rom + `</div>
		<div>Thẻ nhớ : ` + t.detail.microUSB + `</div>
		<div>Đánh Dung lượng pin : ` + t.detail.battery + `</div>`;
    document.getElementById("info_product").innerHTML = s1;

    var s2 = "<b>Sửa thông tin sản phẩm</b>"
    s2 += `<div>Mã sản phẩm : <input disabled="disabled" id="masp" value="` + t.masp + `"></div>
		<div>Tên sản phẩm : <input id="name" value="` + t.name + `"></div>
		<div>Hãng : 
			<select id="hang">`
    var s = ["Apple", "Samsung", "Oppo", "Nokia", "Huawei", "Xiaomi", "Realme", "Vivo", "Philips", "Mobell", "Mobiistar", "Itel", "Coolpad", "HTC", "Motorola"];
    for (var i = 0; i < s.length; i++) {
        if (t.company == s[i]) s2 += `<option selected="selected" value="` + s[i] + `">` + s[i] + `</option>`;
        else s2 += `<option value="` + s[i] + `">` + s[i] + `</option>`;
    }
    s2 += `</select>
		</div>
		<div>Hình đại diện :<img id="img" src="` + t.img + `"><input id="upload1" type="file" accept="image/*" onchange="loadFile(event, 'img')">
</div>`
	var temp = stringToNum(t.price);
	s2+=`<div>Giá tiền : <input id="price" value="` + temp + `"></div>
		<div>Số sao : <input id="star" value="` + t.star + `"></div>
		<div>Đánh giá : <input id="rateCount" value="` + t.rateCount + `"></div>
		<div>Khuyến mãi :
			<div>Tên Khuyến mãi : 
			<select id="promo_name">`
    if (t.promo.name == s3[0]) s2 += `<option selected="selected" value="` + s3[0] + `"></option>`;
    else s2 += `<option value="` + s3[0] + `"></option>`;
    if (t.promo.name == s3[1]) s2 += `<option selected="selected" value="` + s3[1] + `">Giảm Giá</option>`;
    else s2 += `<option value="` + s3[1] + `">Giảm Giá</option>`;
    if (t.promo.name == s3[2]) s2 += `<option selected="selected" value="` + s3[2] + `">Trả góp</option>`;
    else s2 += `<option value="` + s3[2] + `">Trả góp</option>`;
    if (t.promo.name == s3[3]) s2 += `<option selected="selected" value="` + s3[3] + `">Giá rẻ Online</option>`;
    else s2 += `<option value="` + s3[3] + `">Giá rẻ Online</option>`;
    if (t.promo.name == s3[4]) s2 += `<option selected="selected" value="` + s3[4] + `">Mới ra mắt</option>`;
    else s2 += `<option value="` + s3[4] + `">Mới ra mắt</option>`;
    s2 += `</select>
			<div>Thông tin khuyến mãi : <input id="promo_value" value="` + t.promo.value + `"></div>
		</div>
		<div><b>Thông số kỹ thuật</b></div>
		<div>Màn hình : <input id="detail_screen" value="` + t.detail.screen + `"></div>
		<div>Hệ điều hành : <input id="detail_os" value="` + t.detail.os + `"></div>
		<div>Camara sau : <input id="detail_camara" value="` + t.detail.camara + `"></div>
		<div>Camara trước : <input id="detail_camaraFront" value="` + t.detail.camaraFront + `"></div>
		<div>CPU : <input id="detail_cpu" value="` + t.detail.cpu + `"></div>
		<div>RAM : <input id="detail_ram" value="` + t.detail.ram + `"></div>
		<div>Bộ nhớ trong : <input id="detail_rom" value="` + t.detail.rom + `"></div>
		<div>Thẻ nhớ : <input id="detail_microUSB" value="` + t.detail.microUSB + `"></div>
		<div>Đánh Dung lượng pin : <input id="detail_battery" value="` + t.detail.battery + `"></div>
		<button onclick="sua('` + t.masp + `')">Sửa</button>`
    document.getElementById("change_product").innerHTML = s2;
}

function sua(masp) {
    var kiemtrasua = confirm("Bạn có chắc chắn muốn sửa ?");
    if (kiemtrasua == true) {
        var ten = document.getElementById("name");
        var hang = document.getElementById("hang");
        var img = document.getElementById("img");
        var price = document.getElementById("price");
        var star = document.getElementById("star");
        var rateCount = document.getElementById("rateCount");
        var promo_name = document.getElementById("promo_name");
        var promo_value = document.getElementById("promo_value");
        var detail_screen = document.getElementById("detail_screen");
        var detail_os = document.getElementById("detail_os");
        var detail_camara = document.getElementById("detail_camara");
        var detail_camaraFront = document.getElementById("detail_camaraFront");
        var detail_cpu = document.getElementById("detail_cpu");
        var detail_ram = document.getElementById("detail_ram");
        var detail_rom = document.getElementById("detail_rom");
        var detail_microUSB = document.getElementById("detail_microUSB");
        var detail_battery = document.getElementById("detail_battery");
        if (check(ten, img, price)) {
            var t = getLocalStorage();
            for (var i of t) {
                if (i.masp == masp) {
                    break;
                }
            }
            var stringprice = numToString(price.value);
            i.name = ten.value;
            i.company = hang.value;
            i.img = img.src;
            i.price = stringprice;
            i.star = star.value;
            i.rateCount = rateCount.value;
            i.promo.name = promo_name.value;
            i.promo.name = promo_value.value;
            i.detail.screen = detail_screen.value;
            i.detail.os = detail_os.value;
            i.detail.camara = detail_camara.value;
            i.detail.camaraFront = detail_camaraFront.value;
            i.detail.cpu = detail_cpu.value;
            i.detail.ram = detail_ram.value;
            i.detail.rom = detail_rom.value;
            i.detail.microUSB = detail_microUSB.value;
            i.detail.battery = detail_battery.value;
            setLocalStorage(t);
            alert("Bạn đã sửa thông tin thành công!");
	        document.getElementById("area_change").style.display = "none";
	        openProducts();
        }
    }
}

var loadFile = function(event, id) {
    var output = document.getElementById(id);
    output.src = URL.createObjectURL(event.target.files[0]);
}

function stringToNum(str) {
    return Number(str.split('.').join(''));
}

function numToString(num) {
    num = Number(num);
    return num.toLocaleString();
}