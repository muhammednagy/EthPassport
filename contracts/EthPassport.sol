pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/lifecycle/Pausable.sol';



/* 
@title EthPassport
@author Muhammed Nagy <me@muhnagy.com>
@description Universal idientity on the ethereum blockchain!  
*/

contract EthPassport is Pausable{
    struct Passport {uint Id; string FN; string LN; string BD; string citizenship; string  CountryOfBirth; bool isSet;}
    uint count =  0;
    mapping  (address => Passport) passports ;
    
    modifier OnlyOwner() {require( passports[msg.sender].isSet) ; _;}
    
    
    function compareStrings (string a, string b) private view returns (bool){
        /** Compare two strings */
       return keccak256(a) == keccak256(b);
    }

   function  isSet() public view returns(bool) {
           if (passports[msg.sender].isSet) {
               return true;
           } else {
               return false;
           }
   }
    function  myID() public view OnlyOwner returns(uint _IdN , string _FN, string _LN, string _citizenship) {
            /** Get User's ID info */
           _FN = passports[msg.sender].FN ;
           _LN = passports[msg.sender].LN ;
           _IdN = passports[msg.sender].Id;
           _citizenship = passports[msg.sender].citizenship;
           return (_IdN, _FN, _LN, _citizenship);
           
    }

       
    function  myPassport() public view OnlyOwner returns(uint _IdN, string _FN, string _LN, string _BD, string _citizenship, string  _CountryOfBirth) {
            /** Get User's passport  info */
           _IdN = passports[msg.sender].Id;
           _FN = passports[msg.sender].FN ;
           _LN = passports[msg.sender].LN ;
           _BD = passports[msg.sender].BD ;
           _citizenship = passports[msg.sender].citizenship;
           _CountryOfBirth = passports[msg.sender].CountryOfBirth ;
           return ( _IdN, _FN, _LN,  _BD, _citizenship, _CountryOfBirth);
           
    }
    
    
    function  change(string FN, string LN, string BD, string citizenship, string  CountryOfBirth) private  {
        /** main functionn used to make/update passport info */
        passports[msg.sender].FN = FN;
        passports[msg.sender].LN = LN;
        passports[msg.sender].BD = BD;
        passports[msg.sender].citizenship = citizenship;
        passports[msg.sender].CountryOfBirth = CountryOfBirth;
        passports[msg.sender].isSet = true;
    }
    
    function enroll(string FN, string LN, string BD, string citizenship, string  CountryOfBirth) public returns (bool) {
        /** Add user's into to the passports mappinng */
        change(FN, LN, BD, citizenship,CountryOfBirth);
        passports[msg.sender].Id = count + 1;
        count += 1;
        return passports[msg.sender].isSet;
    }
    
    function update(string FN, string LN, string BD, string citizenship, string  CountryOfBirth) public returns (bool) {
        /** updates user's info */
        change(FN, LN, BD, citizenship,CountryOfBirth);
        return  passports[msg.sender].isSet;
    }
    
    function auth(uint Id, string FN, string LN) view public returns (bool) {
        /** authenticate user and match his info */
        require(compareStrings(passports[msg.sender].FN,FN) && compareStrings(passports[msg.sender].LN,LN) &&  passports[msg.sender].Id == Id);
        return true;
    }
}