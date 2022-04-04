var APP_ID="table-manager";var LC="https://leetcode.com/problems";var VIEW="tableView rowView".split(" ").reduce(function(prev,curr){prev[curr]=curr;return prev},{});var $jscomp$destructuring$var0=VIEW;var tableView=$jscomp$destructuring$var0.tableView;var rowView=$jscomp$destructuring$var0.rowView;var DIFFICULTIES=["Easy","Medium","Hard"];
var myTable={name:"top-75-leetcode",title:"Top 75 LeetCode Questions",description:'Curated List of Top 75 LeetCode Questions to Save Your Time from <a href="https://www.teamblind.com/post/New-Year-Gift---Curated-List-of-Top-75-LeetCode-Questions-to-Save-Your-Time-OaM1orEU">Blind post</a>.',fields:[{name:"num",type:"number",col:2},{name:"name",col:10,render:function(p){return'\n      <button class="btn btn-light text-start" onclick="main.view(\''+p._id+"')\">"+p.name+'</button>\n      <a target="_blank" href="'+
LC+"/"+p.path+'">\ud83d\udd17</a> '+(p.premium?'<span title="Premium">\ud83e\ude99</span>':"")+"\n      "+(p.completed?"✅":"")}},{name:"neetcodeYt",label:"NeetCode",render:function(p){return p.neetcodeYt?'<a target="_blank" href="https://youtu.be/'+p.neetcodeYt+'" class="text-decoration-none pl-2 pr-2 badge bg-danger" title="Link to YouTube">▷</a>':"-"}},{name:"category",type:"select",useData:true,filter:true,render:function(p){return'<span class="badge bg-secondary">'+p.category+"</span>"}},{name:"difficulty",
type:"select",options:DIFFICULTIES,render:function(p){var $jscomp$destructuring$var1=p;var difficulty=$jscomp$destructuring$var1.difficulty;if(difficulty===void 0)return"-";var badges=["success","warning","danger"];var index=DIFFICULTIES.indexOf(difficulty);var badge=index>=0?badges[index]:"secondary";return'<span class="badge bg-'+badge+'">'+difficulty+"</span>"}},{name:"topics",hide:true,render:function(p){return!p.topics?"":p.topics.split(", ").map(function(t){return'<a class="btn badge bg-secondary" href="https://leetcode.com/tag/'+
t.split(" ").join("-").toLowerCase()+'/">'+t+"</a>"}).join(" ")}},{name:"path",hide:true},{name:"hasSolution",label:"Solution",col:4,type:"checkbox",render:function(p){return p.hasSolution?'<a href="'+LC+"/"+p.path+'/solution">\ud83d\udd11</a>':"-"}},{name:"completed",type:"checkbox",col:4,hide:true},{name:"premium",type:"checkbox",col:4,hide:true},{name:"discuss_post_url",col:12,hide:true},{name:"code",type:"textarea",col:12,rows:10,hide:true,render:function(p){return"<pre>"+p.code+"</pre>"}},{name:"testcases",
type:"textarea",col:12,rows:10,hide:true,render:function(p){return"<pre>"+p.testcases+"</pre>"}}]};var $jscomp$destructuring$var2=myTable;var fields=$jscomp$destructuring$var2.fields;
var main=function(){var modal=document.getElementById("my-modal");var table=document.getElementById("data-table");var form=document.getElementById("data-form");var tableViewDiv=document.getElementById("tableView");var rowViewDiv=document.getElementById("rowView");var rowDisplayDiv=document.getElementById("rowDisplay");var editModeCbx=document.getElementById("editMode");var problems;var searchFilter="";var catFilter="";var premiumFilter=false;var completedFilter=false;var incompleteFilter=false;var editMode=
false;var distinctMap={};var initDropdown=function(){var catToCount=problems.reduce(function(prev,curr){var $jscomp$destructuring$var3=curr||{};var category=$jscomp$destructuring$var3.category;if(prev){if(!prev[category])prev[category]=0;prev[category]++}return prev},{});var categories=Object.keys(catToCount).map(function(name){return{name:name,label:name+" ("+catToCount[name]+")"}});cat.innerHTML='<option value="">- All -</option>\n      '+categories.map(function(o){return'<option value="'+o.name+
'">'+o.label+"</option>"})};var formatRows=function(problems){fields.forEach(function(field){var $jscomp$destructuring$var4=field;var useData=$jscomp$destructuring$var4.useData;var name=$jscomp$destructuring$var4.name;if(useData){var arr=Object.keys(problems.reduce(function(prev,curr){if(curr[name])prev[curr[name]]=1;return prev},{}));arr.sort();distinctMap[name]=arr}});var distinctName={};problems.forEach(function(p){var $jscomp$destructuring$var5=p;var name=$jscomp$destructuring$var5.name;if(!distinctName[name])distinctName[name]=
0;distinctName[name]++});return problems};var initForm=function(){form.innerHTML='<div class="row">\n      <input type="hidden" name="_id" />\n      '+fields.filter(function(f){return f.name}).map(function(field){return displayFormField(field)}).join("")+"\n    </div>";fields.forEach(function(field){var $jscomp$destructuring$var6=field;var name=$jscomp$destructuring$var6.name;var type=$jscomp$destructuring$var6.type;var options=$jscomp$destructuring$var6.options;var useData=$jscomp$destructuring$var6.useData;
var el=form.querySelector("[name="+name+"]");if(el&&type==="select"){var selectOptions=(useData?distinctMap[name]:options)||[];el.innerHTML=selectOptions.map(function(o){return"<option>"+o+"</option>"}).join("")}})};var render=function(){searchFilter=searchFilter.toLowerCase();var list=problems.filter(function(a){return(!catFilter||catFilter===a.category)&&(!premiumFilter||premiumFilter&&a.premium)&&(!completedFilter||completedFilter&&a.completed)&&(!incompleteFilter||incompleteFilter&&!a.completed)&&
(!searchFilter||fields.filter(function(f){return!f.hide&&f.type!=="checkbox"&&a[f.name]!==void 0&&a[f.name].toLowerCase().includes(searchFilter)}).length>0)});editModeCbx.checked=editMode;addBtnTd.className=editMode?"":"d-none";var tbody=table.getElementsByTagName("tbody")[0];tbody.innerHTML=list.map(function(p){return"<tr>\n      "+(fields.filter(function(f){return!f.hide}).map(function(f){return"<td>"+(f.render?f.render(p):p[f.name]===void 0?"-":p[f.name])+"</td>"}).join("")+(editMode?'<td class="text-nowrap">\n      <button class="btn btn-primary btn-sm p-1" onclick="main.edit(\''+
p._id+'\')"\n        data-bs-toggle="modal" data-bs-target="#my-modal">✏️</button>\n      <button class="btn btn-danger btn-sm p-1" onclick="main.delete(\''+p._id+"')\">\ud83d\uddd1️</button>\n    </td>":""))+"\n    </tr>"}).join("");count.innerHTML=list.length+" items"};var populateView=function(data){fields.forEach(function(field){var $jscomp$destructuring$var7=field;var name=$jscomp$destructuring$var7.name;var type=$jscomp$destructuring$var7.type;var render=$jscomp$destructuring$var7.render;var value=
data[name];var el=rowDisplayDiv.querySelector(".row-"+name);if(el)if(type==="checkbox")el.innerHTML=value?"☑️":"⬛";else el.innerHTML=value===void 0?"n/a":render?render(data):value})};var populateForm=function(data){if(!data){notify("Not Found","danger");return}form.querySelector("[name=_id]").value=data._id;fields.forEach(function(field){var $jscomp$destructuring$var8=field;var name=$jscomp$destructuring$var8.name;var type=$jscomp$destructuring$var8.type;var el=form.querySelector("[name="+name+"]");
if(el){var value=data[name]===void 0?"":data[name];if(type==="checkbox")el.checked=!!value;else el.value=value}})};var clearForm=function(){form.querySelector("[name=_id]").value="";fields.forEach(function(field){var $jscomp$destructuring$var9=field;var name=$jscomp$destructuring$var9.name;var type=$jscomp$destructuring$var9.type;var el=form.querySelector("[name="+name+"]");if(el)if(type==="checkbox")el.checked=false;else el.value=""})};var initTable=function(){var thead=table.getElementsByTagName("thead")[0];
if(!thead){thead=document.createElement("thead");table.appendChild(thead)}thead.innerHTML="<tr>\n      "+fields.filter(function(f){return!f.hide}).map(function(f){return"<th>"+(f.label||cap(f.name))+"</th>"}).join("")+"\n      "+(editMode?"<th>Actions</th>":"")+"\n    </tr>";var tbody=table.getElementsByTagName("tbody")[0];if(!tbody)table.appendChild(document.createElement("tbody"))};var initView=function(){rowDisplayDiv.innerHTML='<div class="row">'+fields.map(function(field){return displayField(field)}).join("")+
"</div>"};var selectView=function(view){tableViewDiv.style.display=view===tableView?"block":"none";rowViewDiv.style.display=view===rowView?"block":"none"};var init=function(){problems=problems.map(function(p){if(!p._id)p._id=newObjectId();return p});title.innerHTML=myTable.title;description.innerHTML=myTable.description;formatRows(problems);initDropdown();initForm();initTable();initView();render()};window.onload=function(){var storedData=localStorage.getItem(APP_ID+"-"+myTable.name);if(storedData){problems=
JSON.parse(storedData);init()}else fetch("data/"+myTable.name+".json").then(function(r){return r.json()}).then(function(data){problems=data;init()})};return{handleCategory:function(val){catFilter=val;render()},filter:function(val){searchFilter=val.toLowerCase();render()},setPremiumFilter:function(val){premiumFilter=val;render()},setCompletedFilter:function(val){completedFilter=val;render()},setIncompleteFilter:function(val){incompleteFilter=val;render()},setEditMode:function(val){editMode=val;initTable();
render()},edit:function(id){return id?populateForm(problems.find(function(d){return d._id===id})):clearForm()},delete:function(_id){var row=problems.find(function(d){return d._id===_id});if(row){if(confirm('Are you sure you want to delete "'+row.name+'"?')){problems=problems.filter(function(d){return d._id!==_id});localStorage.setItem(APP_ID+"-"+myTable.name,JSON.stringify(problems));notify("Successfully saved");render()}}else notify('Row ID "'+_id+'" not found.',"danger")},view:function(_id){var data=
problems.find(function(d){return d._id===_id});populateView(data);selectView(rowView)},viewTable:function(){return selectView(tableView)},saveModal:function(){var data={};fields.forEach(function(field){var $jscomp$destructuring$var10=field;var name=$jscomp$destructuring$var10.name;var elem=form.querySelector("[name=_id]");if(elem)data._id=elem.value;var input=form.querySelector("[name="+name+"]");if(input){var $jscomp$destructuring$var11=input;var type=$jscomp$destructuring$var11.type;var value=$jscomp$destructuring$var11.value;
var checked=$jscomp$destructuring$var11.checked;if(type==="checkbox")data[name]=checked;else data[name]=value}});if(problems.find(function(p){return p._id===data._id}))problems=problems.map(function(p){return p._id===data._id?data:p});else problems.push(data);localStorage.setItem(APP_ID+"-"+myTable.name,JSON.stringify(problems));notify("Successfully saved");render()},closeModal:function(){return modal.style.display="none"},exportData:function(){return document.getElementById("export-data").value=
JSON.stringify(problems)}}}();