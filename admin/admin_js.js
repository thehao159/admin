function setlocalstorage(a) {
    window.localStorage.setItem("ListProductLocalStorage", JSON.stringify(a));
}

function getlocalstorage() {
    return JSON.parse(window.localStorage.getItem("ListProductLocalStorage"));
}

window.onload = function checklocalstorage() //kiểm tra localstorage
    {
        if (getlocalstorage() == null) {
            setlocalstorage(list_products);
        }
    }

function openproducts() //khi ấn vào sản phẩm mặc định là hiện hết sản phẩm
{
    document.getElementById("products").style.display = "block";
    var t = getlocalstorage();
    var s = `<tr>
				<td>STT</td>
				<td>Tên</td>
				<td>Giá</td>
				<td>Xóa</td>
				<td>Sửa</td>
			 </tr>	`;
    var n = 0;
    for (var i of t) {
        n++;
        var temp = i.name.replace(/ /g, "-");
        s += `<tr>
				<td>` + n + `</td>
				<td><a target="blank" href="https://hoangtran0410.github.io/DoAn_Web1/chitietsanpham.html?` + temp + `">` + i.name + `<a></td>
				<td>` + i.price + `</td>
				<td onclick="deleted('` + i.name + `')">&times</td>
				<td onclick="change('`+i.name+`')">&Theta;</td>
			 	</tr>`;
    }
    document.getElementById("the_lists").innerHTML = s;
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
function checkproducts() //đưa kết quả vào table
{
    var laytr = document.getElementsByTagName("tr");
    var input = document.getElementById("search").value;
    for (var i = 1; i < laytr.length; i++) 
    {
    	var td = laytr[i].getElementsByTagName("td")[1];
        var tenSp = td.getElementsByTagName("a")[0].innerHTML;

        if (tenSp.toUpperCase().indexOf(input.toUpperCase()) == -1) {
            laytr[i].style.lineHeight = "0"; // thu nho
            laytr[i].style.opacity = "0"; // làm mờ
            laytr[i].style.zIndex = "-10"; // đưa ra sau
        }
        else {
            laytr[i].style.lineHeight = "1";
            laytr[i].style.opacity = "";
            laytr[i].style.zIndex = "";
        }
    }
}

function closeproducts() //nút tắt sản phẩm
{
    document.getElementById("products").style.display = "none";
}


//Phần thêm xóa sửa

function add() {

}

function deleted(ten) {
    var t = getlocalstorage();
    var deleted = [];
    for (var i of t) {
        if (ten != i.name) {
            deleted.push(i);
        }
    }
    setlocalstorage(deleted);
    openproducts()
}

function travesanphamtheoten(a)//trả về sp theo tên
{
	var list = getlocalstorage();
	for (var i of list)
	{
		if (i.name == a)
		{
			return i;
		}
	}
}

function backinchange()//nút back ở trong area_change
{
	openproducts();
	document.getElementById("area_change").style.display = "none";
}

function check(ten,hang,img,gia)
{
	if (ten.value == "")
	{
		alert("Bạn chưa nhập tên");
		ten.focus();
		return false;
	}
	if (hang.value == "")
	{
		alert("Bạn chưa chọn hãng");
		hang.focus();
		return false;
	}
	if (img.src == "")
	{
		alert("Bạn chưa có hình");
		img.focus();
		return false;
	}
	if (gia.value == "")
	{
		alert("Bạn chưa nhập giá");
		hang.focus();
		return false;
	}
}

function change(a) {
	document.getElementById("products").style.display = "none";
	document.getElementById("area_change").style.display = "block";
	var s3=["","giamgia","tragop","giareonline","moiramat"];
	var t = travesanphamtheoten(a);
	var s1 = "<b>Thông tin sản phẩm cần sửa</b>"
	s1+=`<div>Tên sản phẩm : `+t.name+`</div>
		<div>Hãng : `+t.company+`</div>
		<div>Hình đại diện : <img src="`+t.img+`"></div>
		<div>Giá tiền : `+t.price+`</div>
		<div>Số sao : `+t.star+`</div>
		<div>Đánh giá : `+t.rateCount+`</div>
		<div>Khuyến mãi : 
			<div>Tên Khuyến mãi : `
			if(t.promo.name==s3[0]) s1+=``;
			if(t.promo.name==s3[1]) s1+=`Giảm giá`;
			if(t.promo.name==s3[2]) s1+=`Trả góp`;
			if(t.promo.name==s3[3]) s1+=`Giá rẻ Online`;
			if(t.promo.name==s3[4]) s1+=`Mới ra mắt`;
		s1+=`</div>
			<div>Thông tin khuyến mãi : `+t.promo.value+`</div>
		</div>
		<div><b>Thông số kỹ thuật</b></div>
		<div>Màn hình : `+t.detail.screen+`</div>
		<div>Hệ điều hành : `+t.detail.os+`</div>
		<div>Camara sau : `+t.detail.camara+`</div>
		<div>Camara trước : `+t.detail.camaraFront+`</div>
		<div>CPU : `+t.detail.cpu+`</div>
		<div>RAM : `+t.detail.ram+`</div>
		<div>Bộ nhớ trong : `+t.detail.rom+`</div>
		<div>Thẻ nhớ : `+t.detail.microUSB+`</div>
		<div>Đánh Dung lượng pin : `+t.detail.battery+`</div>`;
	document.getElementById("info_product").innerHTML = s1;
	var tenbandau = t.name;
	
	var s2 = "<b>Sửa thông tin sản phẩm</b>"
	s2+=`<div>Tên sản phẩm : <input id="name" value="`+t.name+`"></div>
		<div>Hãng : 
			<select id="hang" id="company">`
			var s=["Apple","Samsung","Oppo","Nokia","Huawei","Xiaomi","Realme","Vivo","Philips","Mobell","Mobiistar","Itel","Coolpad","HTC","Motorola"];
			for (var i=0;i<s.length;i++)
			{
				if(t.company==s[i]) s2+=`<option selected="selected" value="`+s[i]+`">`+s[i]+`</option>`;
				else s2+=`<option value="`+s[i]+`">`+s[i]+`</option>`;
			}
		s2+=`</select>
		</div>
		<div>Hình đại diện :<img id="img" src="`+t.img+`"><input id="asd" type="file" accept="image/*" onchange="loadFile(event)">
</div>
		<div>Giá tiền : <input id="price" value="`+t.price+`"></div>
		<div>Số sao : <input id="star" value="`+t.star+`"></div>
		<div>Đánh giá : <input id="rateCount" value="`+t.rateCount+`"></div>
		<div>Khuyến mãi :
			<div>Tên Khuyến mãi : 
			<select name="" id="promo_name">`
				if(t.promo.name==s3[0]) s2+=`<option selected="selected" value="`+s3[0]+`"></option>`;
				else s2+=`<option value="`+s3[0]+`"></option>`;
				if(t.promo.name==s3[1]) s2+=`<option selected="selected" value="`+s3[1]+`">Giảm Giá</option>`;
				else s2+=`<option value="`+s3[1]+`">Giảm Giá</option>`;
				if(t.promo.name==s3[2]) s2+=`<option selected="selected" value="`+s3[2]+`">Trả góp</option>`;
				else s2+=`<option value="`+s3[2]+`">Trả góp</option>`;
				if(t.promo.name==s3[3]) s2+=`<option selected="selected" value="`+s3[3]+`">Giá rẻ Online</option>`;
				else s2+=`<option value="`+s3[3]+`">Giá rẻ Online</option>`;
				if(t.promo.name==s3[4]) s2+=`<option selected="selected" value="`+s3[4]+`">Mới ra mắt</option>`;
				else s2+=`<option value="`+s3[4]+`">Mới ra mắt</option>`;
		s2+=`</select>
			<div>Thông tin khuyến mãi : <input id="promo_value" value="`+t.promo.value+`"></div>
		</div>
		<div><b>Thông số kỹ thuật</b></div>
		<div>Màn hình : <input id="detail_screen" value="`+t.detail.screen+`"></div>
		<div>Hệ điều hành : <input id="detail_os" value="`+t.detail.os+`"></div>
		<div>Camara sau : <input id="detail_camara" value="`+t.detail.camara+`"></div>
		<div>Camara trước : <input id="detail_camaraFront" value="`+t.detail.camaraFront+`"></div>
		<div>CPU : <input id="detail_cpu" value="`+t.detail.cpu+`"></div>
		<div>RAM : <input id="detail_ram" value="`+t.detail.ram+`"></div>
		<div>Bộ nhớ trong : <input id="detail_rom" value="`+t.detail.rom+`"></div>
		<div>Thẻ nhớ : <input id="detail_microUSB" value="`+t.detail.microUSB+`"></div>
		<div>Đánh Dung lượng pin : <input id="detail_battery" value="`+t.detail.battery+`"></div>
		<button onclick="sua('`+tenbandau+`')">Sửa</button>`
		document.getElementById("change_product").innerHTML = s2;
	}

	function sua(a)
	{
		var ten = document.getElementById("name");
		var hang = document.getElementById("hang");
		var img = document.getElementById("img");
		var price = document.getElementById("price");
		var star = document.getElementById("star");
		var rateCount = document.getElementById("rateCount");
		var promo_name = document.getElementById("promo_name");
		var promo_value = document.getElementById("promo_value").value;
		var detail_screen = document.getElementById("detail_screen");
		var detail_os = document.getElementById("detail_os");
		var detail_camara = document.getElementById("detail_camara");
		var detail_camaraFront = document.getElementById("detail_camaraFront");
		var detail_cpu = document.getElementById("detail_cpu");
		var detail_ram = document.getElementById("detail_ram");
		var detail_rom = document.getElementById("detail_rom");
		var detail_microUSB = document.getElementById("detail_microUSB");
		var detail_battery = document.getElementById("detail_battery");
		var kiemtrasua = confirm("Bạn có chắc chắn muốn sửa ?");
		if(kiemtrasua==true)
		{
			if (check(ten,hang,img,price) != false)
			{
				var t = getlocalstorage();
				for(var i of t)
				{
					if (i.name == a)
					{
						break;
					}
				}
				i.name=ten.value;
				i.company=hang.value;
				i.img=img.src;
				i.price=price.value;
				i.star=star.value;
				i.rateCount=rateCount.value;
				i.promo.name=promo_name.value;
				i.promo.name=promo_value.value;
				i.detail.screen=detail_screen.value;
				i.detail.os=detail_os.value;
				i.detail.camara=detail_camara.value;
				i.detail.camaraFront=detail_camaraFront.value;
				i.detail.cpu=detail_cpu.value;
				i.detail.ram=detail_ram.value;
				i.detail.rom=detail_rom.value;
				i.detail.microUSB=detail_microUSB.value;
				i.detail.battery=detail_battery.value;
				setlocalstorage(t);
			}
			alert("Bạn đã sửa thông tin thành công!");
			document.getElementById("area_change").style.display="none";
			openproducts();
		}
	}

var loadFile = function(event) {
    var output = document.getElementById('img');
    output.src = URL.createObjectURL(event.target.files[0]);
    
  };