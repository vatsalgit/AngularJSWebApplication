<?php
if(isset($_GET['details']))
{
	$id = $_GET['details'];

	$URL = 'https://graph.facebook.com/v2.8/'.$id.'?fields=id,name,picture.width(700).height(700),albums.limit(5){name,photos.limit(2){images}},posts.limit(5)&access_token=XXXX;

	$details = file_get_contents($URL);

	$details = json_decode($details,true);

	// $details = $details['data'];
	header('Content-Type: application/json');
	echo json_encode($details) ;

}
else
{
if(isset($_GET['query']))
$Query = $_GET['query'];
else 
$Query = 'usc';

if(isset($_GET['type']))
$Type = $_GET['type'];
else
$Type='user';

if($Type=='place')
{
	$center=$_GET['center'];
	$URL = 'https://graph.facebook.com/v2.8/search?q='.$Query.'&type='.$Type.'&fields=id,name,picture.width(700).height(700)&center='.$center.'&access_token=XXXX';
}
else
{
$URL = 'https://graph.facebook.com/v2.8/search?q='.$Query.'&type='.$Type.'&fields=id,name,picture.width(700).height(700)&access_token=XXXX';
}

$response = file_get_contents($URL);
 
$response = json_decode($response,true);

$results=$response;

header('Content-Type: application/json');
echo json_encode($results);
/*foreach ($response as $item)
{
  foreach ($item as $key) {
    print_r($key['picture']['data']['url']);
    echo $key['name'];
    echo $key[ 'id'];
  }

}
*/
}
?>
