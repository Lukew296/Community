using System;
using System.Collections.Generic;

class Program 
{
    static void Main(string[] args)
    {
        int num1 = 0, num2 = 0;
        string str1 = "a";

        int[] myArray = {1, 2, 3, 4};
        List<string> myList = new List<string>();
        myList.Add("one");
        myList.Add("two");
        myList.Add("three");
        myList.Add("four");

        for(int i = 0; i < myArray.Length; i++)
        {
            if(i % 2 == 0) myArray[i] = 10;
            else myList[i] = "ten";
        }

        num1 = myArray[2];
        num2 = myArray[3];
        str1 = myList[1];

        // Add some output to see results
        Console.WriteLine($"num1: {num1}, num2: {num2}, str1: {str1}");
    }
}