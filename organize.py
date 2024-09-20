import pandas as pd
import re

file_path = './MappedPA22CSV.csv'
ofp = 'schema.txt'

def read_clean(file_path, ofp):
    df = pd.read_csv(file_path, low_memory=False)

    print("\n\nShape:",df.shape)
    print("\n\nIndexing:",df.index)
    print("\n\nColumns:",df.columns)

    def check_duplicates(column):
        first_value = column.iloc[0]
        duplicates = column[column == first_value].count()
        return duplicates

    print("\n\nChecking for duplicates in each column:")
    count = 0
    columns = []
    matches = []
    for column in df.columns:
        duplicates = check_duplicates(df[column])
        print(f"\nColumn: {column}")
        columns.append(column)
        print(f"Number of duplicates: {duplicates}")
        print(f"Percentage of duplicates: {(duplicates / 23201) * 100:.2f}%")
        count += 1

    # show the mappings of the data types to build an 'as is' schema with.
    column_types = {col: type(df[col].iloc[0]) for col in df.columns}

    with open(ofp, 'w') as f:
        f.write("Column Types:\n")
        for col, dtype in column_types.items():
            f.write(f"{col}: {dtype}\n")

    for column in df.columns:
        # first match the underscore that appears at the end of each 
        # column name, then match any number of digits and a character. This helps build data associations.
        pattern = r'_\d+[A-Z]$'
        match = re.search(pattern, column)
        # split this off later for better indexing (OPTIMIZATION)
        
        if match:
            # Store the match
            matches.append(match.string)
        else:
            # print(f"No match found for: {column}")
            continue
    
    print("\nMatches: ", matches, "\n\nNumber of Matches: ", len(matches))
    print(f"\nChecked all {count} columns. Listing columns...\n")
    print(f"\n{columns}")

    print("\n\nFirst 2 rows of the data:\n")
    return df.head(2)

read_clean(file_path, ofp)