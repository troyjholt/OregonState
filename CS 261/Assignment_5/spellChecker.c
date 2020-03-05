#include "hashMap.h"
#include <assert.h>
#include <time.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>


struct Link
{
    char * word;
    int value;
    struct Link * next;
    struct Link * prev;
};

struct LinkedList
{
    struct Link * frontSentinel;
    struct Link * backSentinel;
    int size;
};

static void init(struct LinkedList* list)
{

	list->frontSentinel = (struct Link *) malloc(sizeof(struct Link));
	assert(list->frontSentinel != 0);
	list->backSentinel = (struct Link *) malloc(sizeof(struct Link));
	assert(list->backSentinel);
	list->frontSentinel->next = list->backSentinel;
	list->frontSentinel->prev = NULL;
	list->backSentinel->prev = list->frontSentinel;
	list->backSentinel->next = NULL;
	list->size = 0;
}

static void addLinkBefore(struct LinkedList* list, struct Link* link, char* word, int* value)
{
	struct Link* newlink = (struct Link *) malloc(sizeof(struct Link));
	newlink->value = value;
	newlink->word = word;
	newlink->prev = link->prev;
	link->prev->next = newlink;
	newlink->next = link;
	link->prev = newlink;
	list->size++;
}

static void removeLink(struct LinkedList* list, struct Link* link)
{
    link->prev->next = link->next;
   	link->next->prev = link->prev;
    free(link);
    list->size--;
}

struct LinkedList* linkedListCreate()
{
	struct LinkedList* list = malloc(sizeof(struct LinkedList));
	init(list);
	return list;
}

void linkedListDestroy(struct LinkedList* list)
{
	assert(list != NULL);
	while (!linkedListIsEmpty(list))
	{
		linkedListRemoveFront(list);
	}
	free(list->frontSentinel);
	free(list->backSentinel);
	free(list);
	list = NULL;
}
/**
	Adds a new link with the given value to the front of the deque.
	param: 	deque 	struct LinkedList ptr
	param: 	value 	TYPE
	pre: 	deque is not null
	post: 	link is created w/ param value stored before current first link
			(call to addLinkBefore)
 */
void linkedListAddFront(struct LinkedList* list, char* word, int* value)
{
	struct Link* newlink = (struct Link *) malloc(sizeof(struct Link));
	newlink->value = value;
	newlink->word = word;
	list->frontSentinel->next = newlink;
	newlink->next = list->backSentinel;
	newlink->prev = list->frontSentinel;
}

/**
	Adds a new link with the given value to the back of the deque.
	param: 	deque 	struct LinkedList ptr
	param: 	value 	TYPE
	pre: 	deque is not null
	post: 	link is created with given value before last link (sentinel)
			(call to addLinkBefore)
 */
void linkedListAddBack(struct LinkedList* deque, char* word, int* value)
{
	addLinkBefore(deque, deque->backSentinel, word, value);
}

/**
	Returns the value of the link at the front of the deque.
	param: 	deque 	struct LinkedList ptr
	pre:	deque is not null
	pre:	deque is not empty
	post:	none
	ret:	first link's value
 */
char linkedListFront(struct LinkedList* deque)
{
	return deque->frontSentinel->next->value;
}

/**
	Returns the value of the link at the back of the deque.
	param: 	deque 	struct LinkedList ptr
	pre:	deque is not null
	pre:	deque is not empty
	post:	none
	ret:	last link's value
 */
char linkedListBack(struct LinkedList* deque)
{
	return deque->backSentinel->prev->value;
}

/**
	Removes the link at the front of the deque.
	param: 	deque 	struct LinkedList ptr
	pre:	deque is not null
	pre:	deque is not empty
	post:	first link is removed and freed (call to removeLink)
 */
void linkedListRemoveFront(struct LinkedList* deque)
{
	if (deque != NULL)
	{
		if (deque->frontSentinel->next != deque->backSentinel)
		{
			struct Link *garbage = deque->frontSentinel->next;
			removeLink(deque, garbage);
		}
	}
}

/**
	Removes the link at the back of the deque.
	param: 	deque 	struct LinkedList ptr
	pre:	deque is not null
	pre:	deque is not empty
	post:	last link is removed and freed (call to removeLink)
 */
void linkedListRemoveBack(struct LinkedList* deque)
{
	if (deque != NULL)
	{
		if (deque->backSentinel->prev != deque->frontSentinel)
		{
			struct Link *garbage = deque->backSentinel->prev;
			removeLink(deque, garbage);
		}
	}
}

/**
	Returns 1 if the deque is empty and 0 otherwise.
	param:	deque	struct LinkedList ptr
	pre:	deque is not null
	post:	none
	ret:	1 if its size is 0 (empty), otherwise 0 (not empty)
 */
int linkedListIsEmpty(struct LinkedList* deque)
{
	if (deque->size >= 1)
	{
		return 0;
	}
	else
	{
		return 1;
	}
}

/**
	Prints the values of the links in the deque from front to back.
	param:	deque	struct LinkedList ptr
	pre:	deque is not null
	post:	none
	ret:	outputs to the console the values of the links from front
			to back; if empty, prints msg that is empty
 */
void linkedListPrint(struct LinkedList* deque)
{
	struct Link* temp = deque->frontSentinel->next;
	for (int i = 0; i < 5; i++)
	{
        printf("%s, ", temp->word);
        temp = temp->next;
    }
	printf("\n");
}
/*  Adds a link with the given value to the bag.
	param:	bag		struct LinkedList ptr
	param: 	value 	TYPE
	pre: 	bag is not null
	post: 	link is created w/ given value before current first link
			(call to addLinkBefore)
			Note that bag doesn't specify where new link should be added;
			can be anywhere in bag according to its ADT.
 */
void linkedListAdd(struct LinkedList* bag, char* word, int* value)
{
	struct Link *finder = bag->frontSentinel;
	if (finder->next == NULL)
	{
		linkedListAddFront(bag, word, value);
	}
	while (value >= finder->value)
	{
		finder = finder->next;
	}
		addLinkBefore(bag, finder ,word, value);
}

/**
	Returns 1 if a link with the value is in the bag and 0 otherwise.
	param:	bag		struct LinkedList ptr
	param: 	value 	TYPE
	pre: 	bag is not null
	post:	none
	ret:	1 if link with given value found; otherwise, 0
 */
int linkedListContains(struct LinkedList* bag, char value)
{
	struct Link* finder = bag->frontSentinel->next;
	while (finder != bag->backSentinel)
	{
		if (finder->value == value)
		{
			return 1;
		}
	}
	return 0;
}

/**
	Removes the first occurrence of a link with the given value.
	param:	bag		struct LinkedList ptr
	param: 	value 	TYPE
	pre: 	bag is not null
	post:	if link with given value found, link is removed
			(call to removeLink)
 */
void linkedListRemove(struct LinkedList* bag, char value)
{
	struct Link* finder = bag->frontSentinel;
	for (int i = 0; i < bag->size; i++)
	{
		if (finder->value == value)
		{
			removeLink(bag, finder);
			break;
		}
		finder = finder->next;
	}
}

int minimum(int x, int y, int z)
{
	int ret = 0;

	ret = (x < y) ? x : y;
	ret = (z < ret) ? z : ret;

	return ret;
}
/*
 * Levenshtein algorithm I got from https://en.wikipedia.org/wiki/Levenshtein_distance
 * s = user inputted word.
 * m = the users word length.
 * t = dictionary word being compared.
 * n = dictionary word length.
 */
int get_lev_dist(char *s, int m, char *t, int n)
{
	int d[m + 1][n + 1];
	int subCost = 0;

	for (int i = 0; i < m + 1; i++)
	{
		for (int j = 0; j < n + 1; j++)
		{
			d[i][j] = 0;
		}
	}

	for (int i = 0; i < m + 1; i++)
	{
		d[i][0] = i;
	}
	for (int j = 0; j < n + 1; j++)
	{
		d[0][j] = j;
	}

	for (int j = 1; j < n + 1; j++)
	{
		for(int i = 1; i < m + 1; i++)
		{
			if (s[i - 1] == t[j - 1])
			{
				subCost = 0;
			}
			else
			{
				subCost = 1;
			}

			d[i][j] = minimum(d[i - 1][j] + 1,
							  d[i][j - 1] + 1,
							  d[i - 1][j - 1] + subCost);
		}
	}

	return d[m][n];
}

/**
 * Allocates a string for the next word in the file and returns it. This string
 * is null terminated. Returns NULL after reaching the end of the file.
 * @param file
 * @return Allocated string or NULL.
 */

char* nextWord(FILE* file)
{
    int maxLength = 16;
    int length = 0;
    char* word = malloc(sizeof(char) * maxLength);
    while (1)
    {
        char c = fgetc(file);
        if ((c >= '0' && c <= '9') ||
            (c >= 'A' && c <= 'Z') ||
            (c >= 'a' && c <= 'z') ||
            c == '\'')
        {
            if (length + 1 >= maxLength)
            {
                maxLength *= 2;
                word = realloc(word, maxLength);
            }
            word[length] = c;
            length++;
        }
        else if (length > 0 || c == EOF)
        {
            break;
        }
    }
    if (length == 0)
    {
        free(word);
        return NULL;
    }
    word[length] = '\0';
    return word;
}

/**
 * Loads the contents of the file into the hash map.
 * @param file
 * @param map
 */
void loadDictionary(FILE* file, HashMap* map)
{
	char *word;
	while ((word = nextWord(file)) != NULL)
	{
		hashMapPut(map, word, 0);
	}

	return;
}

/**
 * Checks the spelling of the word provded by the user. If the word is spelled incorrectly,
 * print the 5 closest words as determined by a metric like the Levenshtein distance.
 * Otherwise, indicate that the provded word is spelled correctly. Use dictionary.txt to
 * create the dictionary.
 * @param argc
 * @param argv
 * @return
 */
int main(int argc, const char** argv)
{
    HashMap* map = hashMapNew(1000);
    FILE* file = fopen("dictionary.txt", "r");
    clock_t timer = clock();
    loadDictionary(file, map);
    timer = clock() - timer;
    printf("Dictionary loaded in %f seconds\n", (float)timer / (float)CLOCKS_PER_SEC);
    fclose(file);
    int i = 0;
    char ch;
    char inputBuffer[256];
    int quit = 0;

    struct LinkedList* list = linkedListCreate();

    while (!quit)
    {
        i = 0;
        printf("Enter a word or \"quit\" to quit: ");
        scanf("%s", inputBuffer);

        //first check to see if the user wants to quit, then it breaks out of loop.
        if (strcmp(inputBuffer, "quit") == 0)
        {
            quit = 1;
            break;
        }

        // This changes all the users letters to lower case.
        while (inputBuffer[i])
        {
        	ch = inputBuffer[i];
        	inputBuffer[i] = tolower(ch);
        	i++;
        }

        // Checks if the word matches any in the dictionary.
        if (hashMapGet(map, inputBuffer) != 0)
        {
        	printf("The inputted word \"%s\" is spelled correctly.\n", inputBuffer);
        }

        // If the word is not in the dictionary, we run the spell check. It uses
        // the levenshtien algorithm.
        else
        {
        	// This gets the length of the users word.
            int wordLength = strlen(inputBuffer);

            // This cycles through the dictionary and compares users word to dictionary words.
        	for (int i = 0; i < hashMapSize(map); i++)
        	{
        		struct HashLink *current = map->table[i];
        		while (current != NULL)
        		{
        			/**
        			 * This if statment speeds up the process of finding words in the dictionary.
        			 * It is currently set to weed out the words that are 2 letters longer and
        			 * 2 letters shorter than the users inputted word. You can speed it up further
        			 * by changing both "2" ints to "1". You can also search more words by making those
        			 * ints larger, such as changing them to "5".
        			 */
        			if((strlen(current->key) > (wordLength + 2)) || (strlen(current->key) < (wordLength - 2)))
        			{
        				current = current->next;
        			}

        			/**
        			 * This will add the current distance value and current word to a linked list.
        			 * The linked list sorts the distance values as it inserts them. Then after it
        			 * Then after it has searched the dictionary it will print out the first 5 words.
        			 */

        			else
        			{
        				current->value = get_lev_dist(inputBuffer, strlen(inputBuffer), current->key, strlen(current->key));
        				linkedListAdd(list, current->key, current->value);
        				current = current->next;
        			}
        		}
        	}

        	printf("The inputted word \"%s\" is spelled incorrectly.\n", inputBuffer);
        	printf("Did you mean ");
        	linkedListPrint(list);
        	while (list->size > 0)
        	{
        		linkedListRemoveFront(list);
        	}
        }
    }
    hashMapDelete(map);
    return 0;
}
