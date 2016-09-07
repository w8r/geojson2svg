fonts:
	mkdir fonts
	./bin/calculate_font -f 'Arial, Helvetica, sans-serif' > ./fonts/arial_helvetica_ss.json
	./bin/calculate_font -f 'Helvetica, Arial, sans-serif' > ./fonts/helvetica_arial_ss.json
	./bin/calculate_font -f '"Lucida Console", Monaco, monospace' > ./fonts/lucida_monaco_mono.json
	./bin/calculate_font -f 'Verdana, Geneva, sans-serif' > ./fonts/verdana_geneva_ss.json
	./bin/calculate_font -f 'Georgia, Times, serif' > ./fonts/georgia_times_s.json
clean:
	rm -rf fonts
