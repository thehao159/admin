function setlocalstorage(a)
{
	window.localStorage.setItem("ListProductLocalStorage",JSON.stringify(a));
}

function getlocalstorage()
{
	return JSON.parse(window.localStorage.getItem("ListProductLocalStorage"));
}

window.onload = function checklocalstorage()//kiểm tra localstorage
{
	if (getlocalstorage() == null)
	{
		setlocalstorage(list_products);
	}
}

function openproducts()//khi ấn vào sản phẩm mặc định là hiện hết sản phẩm
{
	document.getElementById("products").style.display="block";
	var t = getlocalstorage();
	var s = `<tr>
				<td>STT</td>
				<td>Tên</td>
				<td>Giá</td>
				<td>Xóa</td>
				<td>Sửa</td>
			 </tr>	`;
	var n = 0;
	for (var i of t)
	{
		n++;
		var temp= i.name.replace(/ /g,"-");
		s += `<tr>
				<td>`+n+`</td>
				<td><a href="https://hoangtran0410.github.io/DoAn_Web1/chitietsanpham.html?`+temp+`">`+i.name+`<a></td>
				<td>`+i.price+`</td>
				<td onclick="deleted('`+i.name+`')">&times</td>
				<td>&Theta;</td>
			 	</tr>`;
	}
	document.getElementById("the_lists").innerHTML = s;
}

function searchproducts(list,ten)//tìm theo tên
{
	var t = list;
	var findedproducts = [];
	for (var i of t)
	{
		if (i.name.toUpperCase().indexOf(ten.toUpperCase()) != -1)
		{
			findedproducts.push(i);
		}
	}
	return findedproducts;
}

function checkproducts()//đưa kết quả vào table
{	
	var t = getlocalstorage();
	var ten = document.getElementById("search").value;
	var s = `<tr>
				<td>STT</td>
				<td>Tên</td>
				<td>Giá</td>
				<td>Xóa</td>
				<td>Sửa</td>
			 </tr>`;
	var n = 0;
	var l = searchproducts(t,ten);
	for (var i of l)
	{
		n++;
		var temp= i.name.replace(/ /g,"-");
		s += `<tr>
				<td>`+n+`</td>
				<td><a href="https://hoangtran0410.github.io/DoAn_Web1/chitietsanpham.html?`+temp+`">`+i.name+`<a></td>
				<td>`+i.price+`</td>
				<td onclick="deleted('`+i.name+`')">&times</td>
				<td>&Theta;</td>
			 </tr>`;
	}
	if (n!=0) document.getElementById("the_lists").innerHTML = s;
	else
	{
		s += `<td colspan="4"><i>Không Tìm Thấy Kết Quả</i></td>`;
		document.getElementById("the_lists").innerHTML = s;
	}
}

function closeproducts()//nút tắt sản phẩm
{
	document.getElementById("products").style.display="none";
}


//Phần thêm xóa sửa

function add()
{

}

function deleted(ten)
{
	var t = getlocalstorage();
	var deleted = [];
	for (var i of t)
	{
		if(ten != i.name)
		{
			deleted.push(i);
		}
	}
	setlocalstorage(deleted);
	openproducts()
}