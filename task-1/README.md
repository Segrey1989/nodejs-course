All code for current task is inside task-1 folder.

1. To run the programm use command:
   node task-1/caesar_cli -a encode -s 7 -i "input.txt" -o "output.txt"
2. If there is no input file the system asks to provide data by stdin (by typing in console). In this case if there is an output file - the result will be written in that file, if no - the result will be written into stdout (console).
3. If there is input file, but there is no output file the result will be placed into console.
4. In case both files are provided and exist the result of transformation of input file content will be placed into output file.
5. In case one of the files or both of them are provided but doesn't exist the user will get an error.
6. In case there are no shift argument or action is not provided the process will stop.
