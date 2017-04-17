<?php

if(isset($_GET['query']))
$Query = $_GET['query'];
else 
$Query = 'usc';

if(isset($_GET['type']))
$Type = $_GET['type'];
else
$Type='user';


$URL = 'https://graph.facebook.com/v2.8/search?q='.$Query.'&type='.$Type.'&fields=id,name,picture.width(700).height(700)&access_token=EAAN6z6hlpLIBAFfWzNE9wfcZCHI6YEtyrmboMDZBYZCckOYCZCoM7fbvqQlz3tG2pUc8OGupfN4ohtRBq0l6DXCpMvCu7xvTKZA8WwGLvP9gPufigqeXZAub0dakznHJgZBzFgSIZBRaOj9XeiEcDlGl';

$URL_user = 'https://graph.facebook.com/v2.8/search?q='.$Query.'&type=user&fields=id,name,picture.width(700).height(700)&access_token=EAAN6z6hlpLIBAFfWzNE9wfcZCHI6YEtyrmboMDZBYZCckOYCZCoM7fbvqQlz3tG2pUc8OGupfN4ohtRBq0l6DXCpMvCu7xvTKZA8WwGLvP9gPufigqeXZAub0dakznHJgZBzFgSIZBRaOj9XeiEcDlGl';

$URL_page = 'https://graph.facebook.com/v2.8/search?q='.$Query.'&type=page&fields=id,name,picture.width(700).height(700)&access_token=EAAN6z6hlpLIBAFfWzNE9wfcZCHI6YEtyrmboMDZBYZCckOYCZCoM7fbvqQlz3tG2pUc8OGupfN4ohtRBq0l6DXCpMvCu7xvTKZA8WwGLvP9gPufigqeXZAub0dakznHJgZBzFgSIZBRaOj9XeiEcDlGl';

$URL_event = 'https://graph.facebook.com/v2.8/search?q='.$Query.'&type=event&fields=id,name,picture.width(700).height(700)&access_token=EAAN6z6hlpLIBAFfWzNE9wfcZCHI6YEtyrmboMDZBYZCckOYCZCoM7fbvqQlz3tG2pUc8OGupfN4ohtRBq0l6DXCpMvCu7xvTKZA8WwGLvP9gPufigqeXZAub0dakznHJgZBzFgSIZBRaOj9XeiEcDlGl';

$URL_place = 'https://graph.facebook.com/v2.8/search?q='.$Query.'&type=place&fields=id,name,picture.width(700).height(700)&access_token=EAAN6z6hlpLIBAFfWzNE9wfcZCHI6YEtyrmboMDZBYZCckOYCZCoM7fbvqQlz3tG2pUc8OGupfN4ohtRBq0l6DXCpMvCu7xvTKZA8WwGLvP9gPufigqeXZAub0dakznHJgZBzFgSIZBRaOj9XeiEcDlGl';

$URL_group = 'https://graph.facebook.com/v2.8/search?q='.$Query.'&type=group&fields=id,name,picture.width(700).height(700)&access_token=EAAN6z6hlpLIBAFfWzNE9wfcZCHI6YEtyrmboMDZBYZCckOYCZCoM7fbvqQlz3tG2pUc8OGupfN4ohtRBq0l6DXCpMvCu7xvTKZA8WwGLvP9gPufigqeXZAub0dakznHJgZBzFgSIZBRaOj9XeiEcDlGl';


$response = file_get_contents($URL);

$response_user = file_get_contents($URL_user);
$response_page = file_get_contents($URL_page);
$response_place = file_get_contents($URL_place);
$response_group = file_get_contents($URL_group);
$response_event = file_get_contents($URL_event);
 
$response = json_decode($response,true);

$response_user = json_decode($response_user,true);
$response_page = json_decode($response_page,true);
$response_event = json_decode($response_event,true);
$response_place = json_decode($response_place,true);
$response_group = json_decode($response_group,true);

$results=$response['data'];
$results_user = $response_user['data'];
$results_page = $response_page['data'];
$results_place = $response_place['data'];
$results_group = $response_group['data'];
$results_event = $response_event['data'];

header('Content-Type: application/json');
echo json_encode($results_user);
echo json_encode($results_page);
echo json_encode($results_event);
echo json_encode($results_place);
echo json_encode($results_group);
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
?>
