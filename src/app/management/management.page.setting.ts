import { filter } from "rxjs";
import { User } from "../model/user.model";

export class ManagementPageSetting{
    searchText:string;
    pageLength:number[];
    currentPage:number;
    pageSize:number;
    totalPages:number;
    isSorted:boolean;
    constructor(pageLength:number[],pageSize:number){
        this.searchText='';
        this.pageLength=pageLength;
        this.pageSize=pageSize;
        this.totalPages=0;
        this.currentPage=1;
        this.isSorted=false;
    }
    updateTotalPages(currentName:string,users:User[]) {
        this.getPageData(currentName,users);
    }
    getPageData(currentUserName:string,users:User[]) {
        if (this.currentPage > this.totalPages) {
          this.currentPage = 1;
        }
        let filteredData = this.filterUsers(this.searchText,users); // Apply search filter
        filteredData = filteredData.filter(user => user.username !== currentUserName);
        this.totalPages = Math.ceil(filteredData.length / this.pageSize);
        const startIndex = (this.currentPage - 1) * this.pageSize;

        const endIndex = Math.min(parseInt(startIndex.toString()) + parseInt(this.pageSize.toString()), filteredData.length);

        filteredData.filter(u=>u.username!==currentUserName);
        
        return filteredData.slice(startIndex, endIndex);
    
    }
    sortByString(columnName: string,users:User[]) {
        this.isSorted = !this.isSorted; // Toggle sorting direction
    
        users.sort((a, b) => {
          const aValue = (a as any)[columnName];
          const bValue = (b as any)[columnName];
    
          // Apply sorting logic (ascending for true, descending for false)
          return this.isSorted ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        });
    }
    sortByNumber(columnName: string,users:User[]) {
        this.isSorted = !this.isSorted; // Toggle sorting direction
    
        users.sort((a, b) => {
          const aValue = +(a as any)[columnName]; // Convert to number before comparison
          const bValue = +(b as any)[columnName];
    
          // Apply sorting logic based on isSorted (ascending/descending)
          return this.isSorted ? aValue - bValue : bValue - aValue;
        });
    }
    filterUsers(searchText: string,users:User[]): any[] {
        if (!searchText) {
          return users; // Return all data if no search text
        }
    
        searchText = searchText.toLowerCase(); // Make search case-insensitive
        return users.filter(user => {
          const userStr = user.username.toLowerCase() + user.email.toLowerCase() +
            user.password.toLowerCase() + user.id.toString().toLowerCase() + user.phonenumber.toString();
          return userStr.includes(searchText);
        });
      }
      goToPreviousPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      }
    
      goToNextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      }
}