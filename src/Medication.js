class Medication {
    function Medication(docName, medName, bodyPart, dosageSize, monList, tueList, wedList, ThuList, friList, satList, sunList) {
            this.docName=docName;
            this.medName=medName;
            this.bodyPart=bodyPart;
            this.dosageSize=dosageSize;
            this.frequency={};
            this.frequency['Monday']=monList;
            this.frequency['Tuesday']=tueList;
            this.frequency['Wednesday']=wedList;
            this.frequency['Thursday']=thuList;
            this.frequency['Friday']=friList;
            this.frequency['Saturday']=satList;
            this.frequency['Sunday']=sunList;
    }
    function getdocName()
    {return this.docName;}


    function getmedName()
    {return this.medName;}


    function getbodyPart()
    {return this.bodyPart;}

    function getdosageSize()
    {return this.dosageSize;}

    function getDayFrequency(day)
    {return this.frequency[day];}
}
