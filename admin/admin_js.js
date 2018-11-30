window.onload = function checklocalstorage()
{
	if (getlocalstorage() == null)
	{
		setlocalstorage();
	}
}

function openproducts()
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
		s += `<tr>
				<td>`+n+`</td>
				<td><a href="#">`+i.name+`<a></td>
				<td>`+i.price+`</td>
				<td>&times</td>
				<td>&Theta;</td>
			 </tr>`;
	}
	document.getElementById("the_lists").innerHTML = s;
}

function closeproducts()
{
	document.getElementById("products").style.display="none";
}


//Phần thêm xóa sửa
function setlocalstorage()
{
	window.localStorage.setItem("ListProductLocalStorage",JSON.stringify(list_products));
}

function getlocalstorage()
{
	return JSON.parse(window.localStorage.getItem("ListProductLocalStorage"));
}

// function add()
// {

// }