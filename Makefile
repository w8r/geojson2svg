FONT_FAMILIES = 'Arial, Helvetica, sans-serif' 'Helvetica, Arial, sans-serif' \
                '"Lucida Console", Monaco, monospace' \
								'Verdana, Geneva, sans-serif' 'Georgia, Times, serif'

font:
	@mkdir -p fonts
	@for ff in $(FONT_FAMILIES); do \
	  ./bin/measure_font -f $$ff > \
		./fonts/`echo $${ff} | tr A-Z a-z | tr -d \" | tr -d \, | tr ' ' _`.json; \
	done
	@echo " - fonts measurements exported to ./fonts/"


clean:
	rm -rf fonts


all: clean font


.PHONY: all
