#include <stdio.h>
#include <stdlib.h> // For system()

void sendPostRequest(char *player1, char *player2)
{
   // Define the curl command
   char curlCommand[1000];
   sprintf(curlCommand, "curl -X POST -H \"Content-Type: application/json\" -d \"{\\\"player1\\\": %s, \\\"player2\\\": %s}\" http://localhost:3000/current-match\n", player1, player2);

   // Execute the curl command
   int result = system(curlCommand);
  // return curlCommand;
}